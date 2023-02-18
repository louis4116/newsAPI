import React,{useState,useEffect,useCallback} from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import { dataAction, fetchNewsData } from '../../store/data-slice';
import ContentItem from './ContentItem';
import Spinner from '../spinner/Spinner';

import ReactPaginate from 'react-paginate';
import classes from "./content.module.css";


const Content = ({itemsPerPage}) => {
    const [currentData,setCurrentData]=useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount,setPageCount]=useState(0);
    const dispatch=useDispatch();
    const newsData=useSelector(state=>state.data.fetchContent);
    
    const call=useCallback(()=>{
        dispatch(fetchNewsData())
    },[]);
    useEffect(()=>{
        call();
    },[call]);

    useEffect(()=>{
      const endOffset = itemOffset + itemsPerPage;
      setCurrentData(newsData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(newsData.length / itemsPerPage));
    },[itemsPerPage,itemOffset,newsData])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % newsData.length;
    setItemOffset(newOffset);
  };
  return (
    <div className={classes['content-container']}>
     
      <div className={classes.contentMap}>
        {currentData.length===0 ? <Spinner /> :currentData.map((item,i)=>(
        <ContentItem 
        key={i}
        title={item.title}
        author={item.author} 
        content={item.content} 
        description={item.description} 
        publishedAt={item.publishedAt}
        url={item.url}
        urlToImage={item.urlToImage}
        
        />))}
        </div>
       
         {currentData.length===0?"":<ReactPaginate  
        className={classes.paginate}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName={classes.pagination}
        pageLinkClassName={classes["page-num"]}
        previousClassName={classes["page-num"]}
        nextClassName={classes["page-num"]}
        activeClassName={classes.active}
        />}
      
        
        </div>
  )
}

export default Content