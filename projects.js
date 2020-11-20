async function listProjects() {
    try {
        let response = await fetch('projects.json');
        let projects = await response.json();
        
        console.log(projects);

    } catch(error) {
        console.log(error);
    }
}

listProjects();