import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { GetBookById } from '../../apicalls/books';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { Col, Row, message } from 'antd';
import moment from 'moment';

function BooksDescription() {
    const [bookData, setBookData] = React.useState(null);
    const dispatch = useDispatch();

    const {id} = useParams();

    const getBooks = async() =>{
        try {
            dispatch(ShowLoading());
            const response = await GetBookById(id);
            dispatch(HideLoading());

            if(response.success){
                setBookData(response.data);
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
  return (
    bookData && <div>
       <Row gutter={[16,16]} align="middle" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className='flex flex-col gap-2'>
            <h1 className='text-2xl text-secondary uppercase font-bold mt-2'>
                {bookData?.title}
            </h1>
            <hr/>
            <div className='flex justify-center'>
            <img src={bookData?.image} alt='' height={400} width={400}/>
            </div>

            <p>{bookData?.description}</p>

            <div className='flex justify-between'>
                <h1 className='text-md'>Author</h1>
                <h1 className='text-md'>{bookData?.author}</h1>
            </div>
            <div className='flex justify-between'>
                <h1 className='text-md'>Publisher</h1>
                <h1 className='text-md'>{bookData?.publisher}</h1>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-md'>Published Date</h1>
                <h1 className='text-md'>
                    {moment(bookData?.publishedDate).format("MMMM Do YYYY")}
                </h1>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-md'>Available Copies</h1>
                <h1 className='text-md'>{bookData?.availableCopies}</h1>
            </div>
        </Col>

       
       </Row>
    </div>
  )
}

export default BooksDescription