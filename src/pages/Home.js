import { onValue, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { fireDb } from '../firebase';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [collections,setData]=useState({});
    const navigate =useNavigate();
    useEffect(()=>{

        const contactsCollection=ref(fireDb,"contacts");
        onValue(contactsCollection,(snapshot)=>{
            if(snapshot.exists()){
                setData(snapshot.val())
            }else{
                setData({})
            }
            return ()=>{
                setData({})
            }
        })
    })

    const SupprimeContacts=(id)=>{
        if(window.confirm("Etre vous sûr de vouloir supprimer ?")){
            const contactsSelectionner=ref(fireDb,`contacts/${id}`)
            remove(contactsSelectionner,(err)=>{
                if (err){
toast.error(err)
                }else{
toast.success("suppression Effectuée")
                }
            })
            setTimeout (()=>navigate("/"),700); 
        }
    }
    return (
        <>
            <div> 
            <table class="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Nom</th>
      <th scope="col">Email</th>
      <th scope="col">Conatct</th>
      <th scope="col">Action</th> 
    </tr>
  </thead>
  <tbody>
    {Object.keys(collections).map((id,index)=>{
        return (
            <tr key={id}>
            <th scope="row">{index+1}</th>
            <td >{collections[id].name}</td>
            <td>{collections[id].email}</td>
            <td>{collections[id].contact}</td>
            <td><Link to={`/view/${id}`}>
            <button type="button" class="btn btn-secondary">Voir</button>
                </Link>&nbsp;
                <Link to={`/update/${id}`}>
            <button type="button" class="btn btn-warning">editer</button>
                </Link>&nbsp;
                <Link to={`/update/${id}`}>
            <button type="button" class="btn btn-danger" onClick={()=>SupprimeContacts(id)}>Supprimer</button>
                </Link>
                </td>
          </tr>
        )
    })}
   
   
  </tbody>
</table>
            </div>
        </>
    );
};

export default Home;
