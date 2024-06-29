import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom'
import axios from '../../helpers/axios'
import QuestionContainer from './QuestionContainer';
const Question = () => {

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });


  let location = useLocation()
  let searchQuery = new URLSearchParams(location.search)
  const [obj, setObj] = useState({})
  const [sort, setSort] = useState({ sort: 'rating', order: 'desc' })
  const [page, setPage] = useState(searchQuery.get('page') || 1);
  
  let limit = 12;
  if (isMobile) {
    limit = 30;
  } else if (isTablet) {
    limit = 30;
  }

  const getAllJobs = useCallback(async () => {
    try {
      const { data } = await axios(`/api/questions?page=${page}&limit=${limit}&sort=${sort.sort},${sort.order}`)
      setObj(data)
    } catch (error) {
      console.error('error fetching data : ', error);
    }
  }, [sort, page, limit])


  useEffect(() => {
    getAllJobs();
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [getAllJobs, page]);



  return (
    <div className="min-h-lvh px-4">


        <QuestionContainer questions={obj.resultQuestion ? obj.resultQuestion : []} />




    </div>
  )
}

export default Question