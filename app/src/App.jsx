import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResult';

export const BASE_URL = 'http://localhost:9000';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  const fetchFoodData = async () => {
    setLoading(true)
    try {
      const response = await fetch(BASE_URL);
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
      setLoading(false);
    } catch (error) {
      setError('Unable to fetch data');
    }

  }
  useEffect(() => {
    fetchFoodData();
  }, [])

  const searchFood = e => {
    const searchValue = e.target.value;
    if (!searchValue) {
      setFilteredData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredData(filter);
  }

  const filteredFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()))
    setFilteredData(filter);
    setSelectedBtn(type);
  }

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading..........</div>
  return <>
    <Container>
      <TopContainer>
        {/* logo  */}
        <div className='logo'>
          <img src="/Foody Zone.svg" alt="" />
        </div>
        {/* input field  */}
        <div className='search'>
          <input onChange={searchFood} type="text" placeholder='Search Food' />
        </div>
      </TopContainer>

      <FilterContainer>
        {filterBtns.map((value) => (
          <Button
            isselected={selectedBtn === value.type}
            key={value.name}
            onClick={() => filteredFood(value.type)}
          >
            {value.name}
          </Button>
        ))}
      </FilterContainer>
    </Container>
    <SearchResult data={filteredData} />
  </>
};

export default App;
































export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isselected }) => (isselected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isselected }) => (isselected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;


