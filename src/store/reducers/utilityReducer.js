export const updateObjects=(Oldobject,updatedProjects)=>{
    return{
        ...Oldobject,
        ...updatedProjects
    }
    }