
import { useEffect } from 'react';
import { useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import axios from 'axios'
//rafce
const Home = ({ type }) => {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGM1M2JmNzk4NjQ1YWQ5ZGEzY2UzMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDk3NjQwMCwiZXhwIjoxNjQ1NDA4NDAwfQ.sZVqmyTNb0NzXT6Bno1lg1rvWhzDMackKo6usEJ8vts`
          }
        }
        )
        setLists(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists()
  }, [type, genre])
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
      {lists.map(list => (
        <List list={list} />
      ))}
    </div>
  )
}
export default Home