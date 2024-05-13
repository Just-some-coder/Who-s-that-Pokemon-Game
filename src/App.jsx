import './App.css'
import {useEffect, useState} from "react";
function Generation(){
    const gens = ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9"];

    return(
        <ul>
            {gens.map((item)=>(
                <li key = {item}>{item}</li>
            ))}
        </ul>
    );
}
function Difficulty(){
    const difficultyList = ["easy", "medium", "hard", "master"];
    return(
        <ul>
            {difficultyList.map((item)=>(
                <li key = {item}>{item}</li>
            ))}
        </ul>
    );
}

function PlayArea(){

    const api = "https://pokeapi.co/api/v2/pokemon/";

    const [pokemonNumber, setPokemonNumber] = useState(1);

    const [usedPokemonNumber, setUsedPokemonNumber] = useState([]);

    const [score, setScore] = useState(0);

    const newApi = api + pokemonNumber;

    const [pokeData, newPokeData] = useState({
        name:"def",
        sprites:{
            other:{
                "official-artwork":{
                    front_default:""
                }
            }
        }
    })

    const [userAnswer, setUserAnswer] = useState("")

    const [correctBool, setCorrectBool] = useState(false);

    const handleUserAnswerChange = (event) => {
        const value = event.target.value;

        if(value.toLowerCase() === pokeData.name){
            setScore(score+1);
            setCorrectBool(true)
            setPokemonNumber(()=>{
                while(1) {
                    const newValue = Math.floor(Math.random() * (151)) + 1;
                    if (!usedPokemonNumber.includes(newValue)) {
                        const temp = [...usedPokemonNumber];
                        temp.push(newValue);
                        setUsedPokemonNumber(temp);
                        return newValue;
                    }
                }

            })
        }

        setUserAnswer(value);
    }

    const handleQuestionSkip = ()=>{
        setPokemonNumber(()=>{
            while(1) {
                const newValue = Math.floor(Math.random() * (151)) + 1;
                if (!usedPokemonNumber.includes(newValue)) {
                    const temp = [...usedPokemonNumber];
                    temp.push(newValue);
                    setUsedPokemonNumber(temp);
                    return newValue;
                }
            }

        })
    }

    useEffect(()=>{
        fetch(newApi)
            .then((data)=>{
                return data.json();
            })
            .then((data)=>{
                newPokeData(data);
            })
    },[newApi])

    useEffect(()=>{
        setTimeout(()=>{
            setCorrectBool(false);
            setUserAnswer("");
        },1000)
    },[correctBool])

    console.log(pokeData.name)
    console.log(usedPokemonNumber)


    return(
        <div className={"play-zone"}>
            <h1>Who is That Pokemon</h1>
            <h3>Score: {score}/{usedPokemonNumber.length}</h3>
            {!correctBool ? <img src={pokeData.sprites.other["official-artwork"].front_default}/>: <h1>Nice Cock</h1>}
            <input placeholder="Pokemon" value={userAnswer} onChange={handleUserAnswerChange}/>
            <button onClick={handleQuestionSkip}>I dont know</button>
        </div>
    );
}

function Game(){
    return(
        <>
            {/*<Generation/>*/}
            {/*<Difficulty/>*/}
            <PlayArea/>
        </>
    );
}

export default Game;