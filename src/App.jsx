import  {useState, useEffect} from 'react';

import './App.css';
import  pathIconBike from './icon/icon-bike.png'
import  pathIconCart from './icon/icon-cart.png'
import  pathIconFlame from './icon/icon-flame.png'
import  pathIconFlower from './icon/icon-flower.png'
import  pathIconHeart from './icon/icon-heart.png'
import  pathIconCar from './icon/icon-car.png'

import  pathIconQuestion from './icon/icon-bolt.png'

const initialArrayCards = [
    {id:1, img: pathIconBike},
    {id:2, img: pathIconCart},
    {id:3, img: pathIconFlame},
    {id:4, img: pathIconFlower},
    {id:5, img: pathIconHeart},
    {id:6, img: pathIconCar},
]


function App() {

    const [arrayCards, setArrayCards] = useState([])
    const [openedCards, setOpenedCards] = useState([])
    const [matched, setMatched] = useState([])
    const [moves, setMoves] = useState(0)

    const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]

   const shuffle = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    useEffect(()=>{
        setArrayCards(shuffle(pairOfArrayCards))
    },[])


    const flipCard = (index) => () => {
        setOpenedCards(opened => [...opened, index]);
        setMoves(prevMove => prevMove + 1)
    }

    useEffect(() => {
        if (openedCards < 2) return
        const firstMatched = arrayCards[openedCards[0]];
        const secondMatched = arrayCards[openedCards[1]];

        if (secondMatched && firstMatched.id === secondMatched.id) {
            setMatched([...matched, firstMatched.id])
        }

        if (openedCards.length === 2) setTimeout(() => setOpenedCards([]),1000)
    }, [openedCards])

    const handleGameRestart = () => {
        setOpenedCards([]);
        setMatched([]);
        setMoves(0);
        setArrayCards(shuffle(pairOfArrayCards))
    }

    return (
    <div className="container">
        <p className="number-of-strokes">Сделано ходов: {moves}</p>
        <div className="cards">
            {arrayCards.map((item, index) => {
                let isFlipped = false;

                if (openedCards.includes(index)) isFlipped = true
                if (matched.includes(item.id)) isFlipped = true

                return (
                    <div key={index}
                         className={`card ${isFlipped ? 'flipped' :' '}`}
                         onClick={flipCard(index)}>
                        <div className='inner'>
                            <div className='front'>
                                <img src={item.img} width="100" alt="front-card"/>
                            </div>
                            <div className='back'>
                                <img src={pathIconQuestion} alt="question mark"/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <button className="button-restart" onClick={handleGameRestart}>Начать заново</button>
    </div>
  );
}

export default App;
