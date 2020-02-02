import React, {useEffect, useState} from 'react';
import axios from 'axios';
import coffeeImg from '../img/coffee.png';
import coffeeSteam from '../img/mug.svg';


const ProjectCoffees = (props) => {
    const id = props.match.params.id;
    const [name, setName] = useState('');
    const [coffeesAmount, setCoffeesAmount] = useState(0);
    

    useEffect(() => {
        axios.get(`http://localhost:5000/projects/${id}`)
            .then(res => {
                const {name, coffeesAmount} = res.data;
                setName(name);
                setCoffeesAmount(coffeesAmount);
            })
            .catch(err => console.log(err));
    }, [])

    const addOneCoffee = () => {
        axios.patch(`http://localhost:5000/projects/add-coffee/${id}`)
            .then(res => {
                console.log(res.data);
                setCoffeesAmount(coffeesAmount + 1);
            })
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h1>{name}</h1>
            <img src={coffeeSteam}/>
            <input type="image" src={coffeeImg} alt="Coffee Cup" onClick={addOneCoffee} />
            <h2>{coffeesAmount}</h2>
        </div>
    )
}

export default ProjectCoffees;