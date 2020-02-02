import React, {useEffect, useState} from 'react';
import axios from 'axios';


const ProjectCoffees = (props) => {

    const [project, setProject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:5000/projects/${props.match.params.id}`)
            .then(res => setProject(res.data))
            .catch(err => console.log(err));
    }, [])

    return(
        <div>
            <h1>{project.name}</h1>
            <h1>{project.coffeesAmount}</h1>
        </div>
    )
}

export default ProjectCoffees;