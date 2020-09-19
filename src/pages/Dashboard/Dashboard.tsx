import React, { useContext } from 'react'
import './Dashboard.scss'
import forms from '../../assets/forms.svg';
import Card from './Components/Card';
import Actions from './Components/Actions';
import YourForms from './Components/YourForms';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'

const DATA = gql`
  query userData ($input:FormsInput!){
    userData {
      responses
      forms
      views
    }
  
    forms(input:$input){
        total
        currentPage
        forms {
            formid
            title
        }
    }
  }
`;

export default function Dashboard() {
    const [user, setUser] = useContext(UserContext)
    const { data, loading, error } = useQuery(DATA, { errorPolicy: 'all', fetchPolicy: 'cache-and-network', pollInterval: 21000,variables: { input: { page: 1, open: "ALL", published: "ALL"} } });
    document.title = "Dashboard - DeForm";
    if (!user.auth) return (<Redirect to="/login" />)
    if (error) return (<h1>{error.message}</h1>)
    console.log(data)
    return (
        <section className="section">
            <div className="columns mb-5">
                <Card title="Forms" value={loading ? "-" : data.userData.forms} color="#eb3b5a" img={forms} />
                <Card title="Responses" value={loading ? "-" : data.userData.responses} color="#ff9f43" img={forms} />
                <Card title="Visits" value={loading ? "-" : data.userData.views} color="#34495e" img={forms} />
            </div>
            <p className="is-size-4 has-text-weight-bold mb-3 ml-3" style={{ color: '#3d3d3d' }}>Recent</p>
            <div className="columns">
                <YourForms />
                <Actions />
            </div>
        </section>
    )
}
