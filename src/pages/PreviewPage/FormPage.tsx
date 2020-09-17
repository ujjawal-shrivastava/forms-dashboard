import React, {useState,useContext} from 'react';
import Footer from './components/Footer';
import PageWrap from './components/PageWrap';
import Loader from './components/Loader';
//import * as data from '../form-data.json';
import FormHeader from './components/FormHeader';
import FormSubmit from './components/form-components/FormSubmit';
import FormSection from './components/form-components/FormSection';
import NotFound from './components/NotFound';
import './FormPage.scss'
import Msgpack from 'msgpack-lite';
import {decode as bdecode} from 'base65536';
import { Redirect } from 'react-router-dom';
import {UserContext} from '../../UserContext'

/*type Form = {
    formid: string,
    title: string,
    description: string,
    author: string,
    bgtheme: string,
    isOpen: boolean,
    error: string,
    sections: Array<Section>
}

type Section= {
    title: string,
    components: Array<Components>
}

type Components= {
    type: string,
    title: string,
    isReq: boolean,
    properties:any
    
}*/



export default function FormPage() {
    const [user, setUser] = useContext(UserContext)
    let loading = false;
    let error = "";

    const jsondata= sessionStorage["preview"]?Msgpack.decode(bdecode(sessionStorage["preview"])):""
    const [data, setData] = useState(jsondata);
    //const [response, setResponse] = useState({});
    
    if(!jsondata) return (<NotFound />)
    if (loading) return (<Loader />)
    if (error) return (<NotFound />)
    document.body.style.backgroundColor = data.bgtheme;
    return (
        <div style={{minHeight:"100vh"}}>
            {!user.auth?<Redirect to="/login" />:""}
            <PageWrap>
                <FormHeader title={data.title || "Untitled Form"} description={data.description || "No description."} formid={data.formid ||"a1b2c3"} author={user.name ||"Your Name"} verified={user.verified} />
                <div className="container" id="form">
                    {data.sections.map((value:any, index:number) => {
                        return (
                            <FormSection key={index} title={value.title} components={value.components}/>
                        )
                    })}
                </div>
                <FormSubmit />
            </PageWrap>
            <Footer />
        </div>
    )
}