import React, { useRef, useState } from 'react'
import '../styles/BibService.css'

function BibService() {
    const list = [
        {
            id: 1, 
            buchname: "HP",
            autor: "2222",
            ausleihdatum: "24.12.1998",
            rueckgabedatum: "01.01.1999",
            status: "aktiv"
        },
        {
            id: 2, 
            buchname: "Dell",
            autor: "2445",
            ausleihdatum: "24.12.1998",
            rueckgabedatum: "01.01.1999",
            status: "inaktiv"
        },
    ]
    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)


    return(
        <div className='bibService'>
            <div className='bibServiceTable'>
            <AddList setList = {setList }/>
            <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <th>Buchtitel</th>
                    <th>Autor</th>
                    <th>Ausleihdatum</th>
                    <th>Rückgabedatum</th>
                    <th>Status</th>
                </tr>
                {
                    lists.map((current) => (
                        updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
                        <tr>
                            <td>{current.buchname}</td>
                            <td>{current.autor}</td>
                            <td>{current.ausleihdatum}</td>
                            <td>{current.rueckgabedatum}</td>
                            <td>{current.status}</td>
                            <td>
                                <button className='edit' onClick={() => handleEdit(current.id)}>Edit</button>
                            </td>
                            <td>                        
                                <button className='extend' onClick={() => handleEdit(current.id)}>Extend</button>
                                
                            </td>
                            <td>
                                <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
                
            </table>
            </form>
            </div>
        </div>
    )

    function handleEdit(id) {
        setUpdateState(id)
    }

    function handleStatus(id) {
        setUpdateState(id)
    }

    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const buchname = event.target.elements.buchname.value;
        const autor = event.target.elements.autor.value;
        const ausleihdatum = event.target.elements.ausleihdatum.value;
        const rueckgabedatum = event.target.elements.rueckgabedatum.value;
        const status = "aktiv";
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, buchname:buchname, autor: autor, ausleihdatum: ausleihdatum, rueckgabedatum: rueckgabedatum, status: status} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({current, lists, setList}) {
    function handInputname(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, name :value} : li
        ))

        setList(newlist)
    }
    function handInputprice(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, price :value} : li
        ))

        setList(newlist)
    }
    return(
        <tr>
            <td><input type="text" onChange={handInputname} name='name' value={current.name}/></td>
            <td><input type="text" onChange={handInputprice} name='price' value={current.price}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const buchnameRef = useRef()
    const autorRef = useRef()
    const lendRef = useRef()
    const returnRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const buchname = event.target.elements.buchname.value;
        const autor = event.target.elements.autor.value;
        const ausleihdatum = event.target.elements.ausleihdatum.value;
        const rueckgabedatum = event.target.elements.rueckgabedatum.value;
        const status = "aktiv";
        
        const newlist = {
            id: 3,
            buchname,
            autor,
            ausleihdatum,
            rueckgabedatum,
            status
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        buchnameRef.current.value = ""
        autorRef.current.value = ""
        lendRef.current.value = ""
        returnRef.current.value = ""
    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="buchname" placeholder="Buchname" ref={buchnameRef} required/>
            <input type="text" name="autor" placeholder="Autor/in" ref={autorRef}/>
            <input type="date" name="ausleihdatum" placeholder="Ausleihdatum" ref={lendRef} required/>
            <input type="date" name="rueckgabedatum" placeholder="Rückgabedatum" ref={returnRef} required/>
            <button type="submit">Hinzufügen</button>
        </form>
    )
}

export default BibService;