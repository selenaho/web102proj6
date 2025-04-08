import { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom';
import './App.css'
import ArtInfo from '../Components/ArtInfo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, ResponsiveContainer } from 'recharts';

function App() {
  //const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  //const [cultures, setCultures] = useState(new Set());

  const testData = [
    {
        culture: "China",
        value: 50,
    },
    {
        culture: "Japan",
        value: 100,
    },
  ];

  const {list, cultures} = useOutletContext();

  const searchItems = (inputString) => {
    setSearchQuery(inputString);
    if(inputString != "" || filter != "") {
        const filtered = list.filter((item) => 
            Object.values(item)
              .join("")
              .toLowerCase()
              .includes(inputString.toLowerCase())
            && item.culture.toLowerCase().includes(filter.toLowerCase())
        ); //converts the value into all one big lower case string and sees if searchValue is in it
        //if it's present in the string then it is included in filtered
        setFilteredResults(filtered);
    }
    else {
        setFilteredResults(list);
    }
  };

  const filterItems = (inputString) => {
    setFilter(inputString);
    if(inputString != "" || searchQuery != "") {
        const filtered = list.filter((item) => 
            item.culture.toLowerCase().includes(inputString.toLowerCase())
            && Object.values(item).join("").toLowerCase().includes(searchQuery.toLowerCase())
        ); //converts the value into all one big lower case string and sees if searchValue is in it
        //if it's present in the string then it is included in filtered
        setFilteredResults(filtered);
    }
    else {
        setFilteredResults(list);
    }
  };

  return (
    list.length > 50 ? (
        <div className='whole-page'>
            <h1>Asian Art in the Metropolitan Museum of Art</h1>
            <h3>Randomly generated selection of {list.length} works of art</h3>
            <div>
                <BarChart data={testData} width={500} height={300}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="culture">
                        <Label value="Artwork Cultures" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis label={{ value: '# of artworks', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8"/>
                </BarChart>
            </div>
            <h3>Search by keyword:</h3>
            <input type='text' placeholder='Search...' onChange={(inputString) => searchItems(inputString.target.value)}></input>
            <h3>Filter by culture:</h3>
            <select onChange={(select) => filterItems(select.target.value)}>
                <option value="">All</option>
                {[...cultures].map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Medium</th>
                        <th>Culture</th>
                    </tr>
                </thead>
                <tbody>
                    {searchQuery.length > 0 || filter.length > 0 ? 
                        filteredResults.map((art, index) => (
                            <ArtInfo key={art.id} image={art.image} title={art.title} artist={art.artist} medium={art.medium} culture={art.culture} id={art.id}></ArtInfo>    
                            ))
                    : 
                        list ? list.map((art, index) => (
                            <ArtInfo key={art.id} image={art.image} title={art.title} artist={art.artist} medium={art.medium} culture={art.culture} id = {art.id}></ArtInfo>    
                            ))
                        : null
                    }  
                    
                </tbody>
            </table>
        </div>
    )
    :
        (<><h1>Art Incoming...</h1></>)
  )
}

export default App
