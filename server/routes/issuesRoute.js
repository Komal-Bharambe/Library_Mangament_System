const router = require("express").Router();
const Issue = require("../models/issusesModel");
const Book = require("../models/booksModel");
const authMiddleware = require("../middleware/authMiddleware");

// issue a book to user
router.post("/issue-new-book", authMiddleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be decremented by 1)

    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: -1 } }
    );

    // issue book to user (create new issue record)
    const newIssue = new Issue(req.body);
    await newIssue.save();
    return res.send({
      success: true,
      message: "Book issued successfully",
      data: newIssue,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// get issues
router.post("/get-issues", authMiddleware, async (req, res) => {
  try {
    delete req.body.userIdFromToken;
    const issues = await Issue.find(req.body).populate("book").populate("user").sort({ issueDate: -1});
    return res.send({
      success: true,
      message: "Issues fetched successfully",
      data: issues,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// router.get("/get-issues-by-book/:id", authMiddleware, async(req,res) =>{
//     try {
//         const issues = await Issue.find({ book: req.params.id}).populate("book").populate("user")
//         return res.send({
//             success: true,
//             message: "Issues fetched successfully",
//             data: issues,
//         })
//     } catch (error) {
//         return res.send({
//             success: false,
//             message: error.message,
//         })
//     }
// })

// return a book
router.post("/return-book", authMiddleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be increment by 1)

    await Book.findOneAndUpdate(
      {
        _id: req.body.book,
      },
      {
        $inc: { availableCopies: 1 },
      }
    );
    // return book (update issue record)
    await Issue.findOneAndUpdate(
        {
            _id: req.body._id,
        },
        req.body 
    );

    return res.send({
        success: true,
        message: "Book returned successfully"
    })
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit an issue

router.post("/edit-issue", authMiddleware, async(req, res) =>{
  try {
    
    await Issue.findOneAndUpdate({
      _id: req.body._id, 
    }, req.body);

    res.send({
      success: true,
      message: "Issue updated successfully"
    })

  } catch (error) {
    res.send({
      success: false,
      message: error.message 
    })
  }
})
module.exports = router;
