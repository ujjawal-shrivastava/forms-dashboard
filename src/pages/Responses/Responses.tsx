import React, { useContext, useEffect, useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'
import Loading from '../../components/Loading/Loading';
import { CSVLink } from "react-csv";
const RESPONSES = gql`
  query responses($formid:String!) {
    responses(formid:$formid) {
      responses{
          responseid
          formid
          added
          data
      }
      total
    }

  }
`;
const Responses = withRouter((props: any) => {
    props = { ...props }
    const [user, setUser] = useContext(UserContext)
    const { data, loading, error } = useQuery(RESPONSES, { errorPolicy: 'all', fetchPolicy: 'network-only', variables: { formid: props.match.params.id }, pollInterval: 5000 });
    document.title = "Responses - DeForm";
    if (!user.auth) return (<Redirect to="/login" />)
    if (loading) {
        return (<Loading />)
    }
    if (error) {
        return (<h1>Error</h1>)
    }
    
    const getData = ()=>{
        var resData: any= []
        if(!data.responses.responses.length) return
        data.responses.responses.forEach((i: any) => {
            var myrow = JSON.parse(i.data)
            myrow["added"] = i.added
            resData.push(myrow) 
        });
        return resData
    }
    return (
        <section className="section" style={{ marginTop: "-1rem", padding: "3rem 2rem" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <p className="has-text-dark is-size-4 has-text-weight-bold">Responses ({props.match.params.id})({data.responses.total})</p>
                {data.responses.total?<div><CSVLink
                    data={getData()}
                    filename={`Responses-${props.match.params.id} (${new Date().toLocaleString()}).csv`}
                    className="button is-link is-rounded is-small"
                    target="_blank"
                >
                    <span className="icon is-small">
                        <i className="fa fa-file-excel-o"></i>
                    </span>
                    <span>Export to CSV</span>
                </CSVLink></div>:""}
            </div>
            <div>
                <div className="columns is-mobile is-centered" style={{ marginTop: "0.6rem" }}>
                    <div className="column is-full">

                    </div>
                </div>
            </div>
        </section>
    )
})

export default Responses