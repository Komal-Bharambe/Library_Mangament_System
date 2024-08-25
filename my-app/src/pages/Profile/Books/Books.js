
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import BookForm from './BookForm'
import { useDispatch } from 'react-redux';
import { DeleteBook, GetAllBooks } from '../../../apicalls/books';
import { Table, message } from 'antd';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import moment from "moment";
import Issues from './Issues';
import IssueFrom from './IssueFrom';

function Books() {
    const[formType, setFormType] = useState("add");
    const [selectedBook, setSelectedBook] = useState(null);
    const [openBookFrom, setOpenBookFrom] = React.useState(false);
    const [openIssues, setOpenIssues] = React.useState(false);
    const[openIssuesForm, setOpenIssuesForm] = React.useState(false);

    const [books, setBooks] = React.useState([]);

    const dispatch = useDispatch();

    const getBooks = async() =>{
        try {
            dispatch(ShowLoading());
            const response = await GetAllBooks();
            dispatch(HideLoading());

            if(response.success){
                setBooks(response.data);
            }
            else{
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    }
    useEffect(() =>{
        getBooks()
    }, [])

    const deleteBook = async (id) =>{
        try {
            dispatch(ShowLoading());
            const response = await DeleteBook(id);
            dispatch(HideLoading());

            if(response.success){
                message.success(response.message);
                getBooks();
            }
            else{
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    }

    const columns = [
        {
            title: "Book",
            dataIndex: "image",
            render: (image) => <img src={image} alt="book" width="60" height="60"/>,
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Author",
            dataIndex: "author"
        },
        {
            title: "Publisher",
            dataIndex: "publisher",
        },
        {
            title: "Total Copies",
            dataIndex: "totalCopies"
        },{
            title: "Available Copies",
            dataIndex: "availableCopies"
        },
        {
            title: "Added On",
            dataIndex: "publishedDate",
            render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A")
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) =>(
                <div className='flex gap-1'>
                 <i class="ri-delete-bin-line"
                        onClick={() => deleteBook(record._id)}
                 ></i>
                    <i class="ri-pencil-line"
                        onClick={()=>{
                                setFormType("edit");
                                setSelectedBook(record);
                                setOpenBookFrom(true);
                        }}
                    ></i>
                   <span className='underline'
                        onClick={() =>{
                            setOpenIssues(true);
                            setSelectedBook(record)
                        }}
                   >
                    Issues 
                   </span>

                   <span className='underline' onClick={() => 
                    {
                        setOpenIssuesForm(true); 
                        setSelectedBook(record);
                    }}>
                        IssueBook
                   </span>
                </div>
            )
        }
    ]
  return (
    <div>
        <div className='flex justify-end'>
            <Button title='Add Book'
            onClick={() => {
                setFormType("add");
                setSelectedBook(null);
                setOpenBookFrom(true)
            }} 
            />
        </div>

        <Table columns={columns} dataSource={books} className='mt-1'/>

        {openBookFrom && (
            <BookForm open={openBookFrom} setOpen={setOpenBookFrom} reloadBooks={getBooks} formType={formType} selectedBook= {selectedBook} setSelectedBook={setSelectedBook}/>
        )}

        {openIssues && (
            <Issues open={openIssues} setOpen={setOpenIssues} selectedBook={selectedBook} setSelectedBook={setSelectedBook} reloadBooks={getBooks}/>
        )}

        {openIssuesForm &&(
            <IssueFrom open={openIssuesForm} setOpen={setOpenIssuesForm} selectedBook={selectedBook} setSelectedBook={setSelectedBook} getData={getBooks} type="add"/>
        )}
    </div>
  )
}

export default Books