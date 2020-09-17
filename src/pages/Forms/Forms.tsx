import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import FormTile from './Components/FormTile';
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks';
import {useLazyQuery} from 'react-apollo';
import Loading from '../../components/Loading/Loading';
import { toast as superToast } from 'bulma-toast'
import { encode as bencode, decode as bdecode} from 'base65536';
import Msgpack from 'msgpack-lite';
import ShareDialog from '../../components/ShareDialog';

enum OpenFilter {
    ALL = "ALL",
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}

enum PublishedFilter {
    ALL = "ALL",
    PUBLISHED = "PUBLISHED",
    SAVED = "SAVED"
}

const FORMS = gql`
  query forms($input:FormsInput!) {
    forms(input:$input){
        total
        currentPage
        totalPages
        forms {
            formid
            title
            open
            published
            views
            responses
        }
    }

  }
`;

const FORM = gql`
  query getForm($formid:String!) {
    getForm(formid:$formid) {
      formid
      title
      description
      author{
          name
      }
      data
      bgtheme
      open
    }

  }
`;

const DELETE= gql`
  mutation deleteForm($formid: String!) {
    deleteForm(formid:$formid)
  }
`;

export default function Forms() {
    const [user, setUser] = useContext(UserContext)
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState({ open: OpenFilter.ALL, published: PublishedFilter.ALL })
    const [tempFilters, setTempFilters] = useState({ open: OpenFilter.ALL, published: PublishedFilter.ALL })
    const [filterActive, setFilterActive] = useState(false)
    const [pageError, setPageError] = useState("")
    const [pageActive, setPageActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const [currentForm, setCurrentForm] = useState("")
    const [tempPage, setTempPage] = useState(1)
    const { data: getData, loading: getLoading, error: getError, refetch:getRefetch } = useQuery(FORMS, { errorPolicy: 'all', fetchPolicy:'network-only',variables: { input: { page: page, open: filters.open, published: filters.published } } });
    const [getPreview, {data:previewData}] = useLazyQuery(FORM, { errorPolicy: 'all',fetchPolicy:'network-only'});
    const [formDelete] = useMutation(DELETE, { errorPolicy: 'all'});
    const [shareActive, setShareActive] = useState(false)
    document.title = "Forms - DeForm";
    const handleModalClose = () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setFilterActive(false)
        setPageActive(false)
        setDeleteActive(false)
    }

    const handleFilterClose = () => {
        setTempFilters(filters)
        handleModalClose()
    }

    const handleFilterApply = () => {
        setFilters(tempFilters)
        setPage(1)
        handleModalClose()
        superToast({
            message: `Filters Applied!`,
            type: "is-black",
            position: "top-center",
            duration: 2000,
            animate: { in: 'fadeIn', out: 'fadeOut' },
        });
    }

    const handleFilterReset = () => {
        setTempFilters({ open: OpenFilter.ALL, published: PublishedFilter.ALL })
        setFilters({ open: OpenFilter.ALL, published: PublishedFilter.ALL })
        setPage(1)
        handleModalClose()
        superToast({
            message: `Filters Removed!`,
            type: "is-black",
            position: "top-center",
            duration: 2000,
            animate: { in: 'fadeIn', out: 'fadeOut' },
        });
    }

    const handlePageClose = () => {
        setTempPage(page)
        setPageError("")
        handleModalClose()
    }

    const handlePageApply = () => {
        validatePage(tempPage)
        if (pageError) return
        setPage(tempPage)
        setPageError("")
        handleModalClose()
        superToast({
            message: `Moved to Page ${tempPage}`,
            type: "is-black",
            position: "top-center",
            duration: 2000,
            animate: { in: 'fadeIn', out: 'fadeOut' },
        });
    }

    const handleDelete = () => {
        if(!currentForm) return
        formDelete({variables:{formid:currentForm}})
        setCurrentForm("")
        handleModalClose()
        superToast({
            message: `Deleted Form ${currentForm}`,
            type: "is-black",
            position: "top-center",
            duration: 2000,
            animate: { in: 'fadeIn', out: 'fadeOut' },
        });
        getRefetch()
    }

    const handleDeleteClose =()=>{
        setCurrentForm("")
        handleModalClose()
    }
    


    useEffect(() => {
        setTempPage(page)
    }, [page])

    useEffect(() => {
        if(previewData){
            const form ={
                formid:previewData.getForm.formid,
                title:previewData.getForm.title,
                description:previewData.getForm.description,
                bgtheme:previewData.getForm.bgtheme,
                isOpen:previewData.getForm.open,
                sections:Msgpack.decode(bdecode(previewData.getForm.data))
            }
            sessionStorage.setItem("preview", bencode(Msgpack.encode(form)));
            window.open("/preview", "_blank")
            }
        }, [previewData])

    if (!user.auth) return (<Redirect to="/login" />)
    if (getLoading) return (<Loading />)

    const validatePage = (value: number) => {
        (value > getData.forms.totalPages || value < 1 || !value) ? setPageError(`Page number should be between 1 and ${getData.forms.totalPages}!`) : setPageError("")
        setTempPage(value)
    }
    return (
        <section className="section" style={{ marginTop: "-1rem", padding: "3rem 2rem" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <p className="has-text-dark is-size-4 has-text-weight-bold">Your Forms ({getData.forms.total})</p>
                <button className="button is-dark is-rounded is-small" onClick={() => {
                    document.body.style.top = `-${window.scrollY}px`;
                    document.body.style.width = "100%";
                    document.body.style.position = 'fixed';
                    setFilterActive(true)
                }}>
                    <span className="icon is-small">
                        <i className="fa fa-filter"></i>
                    </span>
                    <span>Filters</span>
                </button>
            </div>
            <div>
                <div className="columns is-mobile is-centered" style={{ marginTop: "0.6rem" }}>
                    <div className="column is-full">
                    {shareActive?<ShareDialog isActive={[shareActive, setShareActive]} form={currentForm}/>:""}
                        <div className={`modal ${filterActive ? "is-active" : ""}`}>
                            <div className="modal-background"></div>
                            <div className="modal-content" style={{ maxWidth: "90%", maxHeight: "60%" }}>
                                <div className="box">
                                    <h1 className="has-text-weight-bold has-text-dark is-size-5">Filters</h1>
                                    <div className="field my-5">
                                        <label className="label is-size-6">Response Status</label>
                                        <div className="control">
                                            <label className="radio mx-3">
                                                <input type="radio" name="open-filter"
                                                    checked={tempFilters.open === OpenFilter.ALL} onChange={() => {
                                                        setTempFilters((current: any) => {
                                                            current = { ...current }
                                                            current.open = OpenFilter.ALL
                                                            return current
                                                        })
                                                    }} />
                                                    <span>All</span>
                                                </label>
                                            <label className="radio mx-3">
                                                <input type="radio" name="open-filter"
                                                    checked={tempFilters.open === OpenFilter.OPEN} onChange={() => {
                                                        setTempFilters((current: any) => {
                                                            current = { ...current }
                                                            current.open = OpenFilter.OPEN
                                                            return current
                                                        })
                                                    }} />
                                                        <span>Open</span>
                                                </label>
                                            <label className="radio mx-3">
                                                <input type="radio" name="open-filter"
                                                    checked={tempFilters.open === OpenFilter.CLOSED} onChange={() => {
                                                        setTempFilters((current: any) => {
                                                            current = { ...current }
                                                            current.open = OpenFilter.CLOSED
                                                            return current
                                                        })
                                                    }} />
                                                        <span>Closed</span>
                                                </label>
                                        </div>
                                    </div>
                                    <div className="field my-5">
                                        <label className="label is-size-6">Visibility Status</label>
                                        <div className="control">
                                            <label className="radio mx-3">
                                                <input type="radio" name="published-filter"
                                                    checked={tempFilters.published === PublishedFilter.ALL} onChange={() => {
                                                        setTempFilters((current: any) => {
                                                            current = { ...current }
                                                            current.published = PublishedFilter.ALL
                                                            return current
                                                        })
                                                    }} />
                                                        <span>All</span>
                                                </label>
                                            <label className="radio mx-3">
                                                <input type="radio" name="published-filter" 
                                                    checked={tempFilters.published === PublishedFilter.SAVED} onChange={() => {
                                                        setTempFilters((current: any) => {
                                                            current = { ...current }
                                                            current.published = PublishedFilter.SAVED
                                                            return current
                                                        })
                                                    }} />
                                                        <span>Draft</span>
                                                </label>
                                            <label className="radio mx-3">
                                                <input type="radio" name="published-filter"
                                                    checked={tempFilters.published === PublishedFilter.PUBLISHED} onChange={() => {
                                                        setTempFilters((current: any) => {
                                                            current = { ...current }
                                                            current.published = PublishedFilter.PUBLISHED
                                                            return current
                                                        })
                                                    }} />
                                                        <span>Published</span>
                                                </label>
                                        </div>
                                    </div>

                                    <div className="buttons mt-5">
                                        <button className="button is-success is-normal has-text-weight-bold" onClick={handleFilterApply}>APPLY</button>
                                        <button className="button is-info is-normal has-text-weight-bold" onClick={handleFilterReset}>RESET</button>
                                        <button className="button is-danger is-normal has-text-weight-bold" onClick={handleFilterClose}>CANCEL</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`modal ${pageActive ? "is-active" : ""}`}>
                            <div className="modal-background"></div>
                            <div className="modal-content" style={{ maxWidth: "90%", maxHeight: "60%" }}>
                                <div className="box">
                                    <h1 className="has-text-weight-bold has-text-dark is-size-5">Goto Page</h1>
                                    <div className="field has-addons mt-5">
                                        <p className="control is-expanded">
                                            <input className="input" type="number" min="1" max={`${getData.forms.totalPages}`} placeholder="Page No." value={tempPage} onChange={(e) => { validatePage(parseInt(e.target.value)) }} />
                                        </p>
                                        <p className="control">
                                            <a className="button is-static">
                                                / {getData.forms.totalPages}
                                            </a>
                                        </p>
                                    </div>
                                    <p className="help mb-5 is-danger">{pageError}</p>
                                    <div className="buttons mt-5">
                                        <button className="button is-success is-small has-text-weight-bold" onClick={handlePageApply}>GOTO PAGE</button>
                                        <button className="button is-danger is-small has-text-weight-bold" onClick={handlePageClose}>CANCEL</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`modal ${deleteActive ? "is-active" : ""}`}>
                            <div className="modal-background"></div>
                            <div className="modal-content" style={{ maxWidth: "90%", maxHeight: "60%" }}>
                                <div className="box pt-4">
                                    <h1 className="has-text-weight-bold has-text-dark is-size-4"><span className="icon is-small has-text-warning mr-2"><i className="fa fa-exclamation-triangle key"></i></span>&nbsp;Delete Form</h1>
                                                <p className="my-5">Are you sure that you want to delete the <strong>Form ({currentForm})</strong>? All the responses on this form will also get deleted. This operation is irreversible.</p>
                                    <div className="buttons mt-5">
                                        <button className="button is-danger  has-text-weight-bold" onClick={handleDelete}>Delete</button>
                                        <button className="button is-dark  has-text-weight-bold" onClick={handleDeleteClose}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {
                            getData.forms.forms.length?getData.forms.forms.map((value: any, index: number) => (
                                <FormTile key={index} form={{ formid: value.formid, title: value.title, open: value.open, published: value.published, responses: value.responses, views: value.views }} preview = {getPreview} deleteActive={[deleteActive, setDeleteActive]} shareActive={[shareActive, setShareActive]} currentForm={[currentForm, setCurrentForm]}/>
                            )):<div className="section has-text-centered" style={{minHeight:"60vh", display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                                <p className="is-size-4 has-text-grey-light">No Forms Here! Go ahead create some or remove filters if applied..</p>                                
                            </div>
                        }
                        
                        {getData.forms.totalPages?<div style={{ marginTop: "2.8rem", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <div className="field has-addons">
                                {page !== 1 ? <p className="control" title="Goto First Page">
                                    <button className="button is-dark" onClick={() => { setPage(1) }}>
                                        <span className="icon is-small">
                                            <i className="fa fa-angle-double-left"></i>
                                        </span>
                                    </button>
                                </p> : ""}
                                {page !== 1 ? <p className="control" title="Goto Previous Page">
                                    <button className="button is-dark" onClick={() => { setPage(page - 1) }}>
                                        <span className="icon is-small">
                                            <i className="fa fa-angle-left"></i>
                                        </span>
                                    </button>
                                </p> : ""}
                                <p className="control" title="Goto Particular Page">
                                    <button className="button is-danger" onClick={() => {
                                        if (getData.forms.totalPages === 1) return
                                        document.body.style.top = `-${window.scrollY}px`;
                                        document.body.style.width = "100%";
                                        document.body.style.position = 'fixed';
                                        setPageActive(true)
                                    }}>
                                        <span className="has-text-weight-bold is-size-7">{`Page ${page}/${getData.forms.totalPages}`}</span>
                                    </button>
                                </p>
                                {page !== getData.forms.totalPages ? <p className="control" title="Goto Next Page">
                                    <button className="button is-dark" onClick={() => { setPage(page + 1) }}>
                                        <span className="icon is-small">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </button>
                                </p> : ""}
                                {page !== getData.forms.totalPages ? <p className="control" title="Goto Last Page">
                                    <button className="button is-dark" onClick={() => { setPage(getData.forms.totalPages) }}>
                                        <span className="icon is-small">
                                            <i className="fa fa-angle-double-right"></i>
                                        </span>
                                    </button>
                                </p> : ""}
                            </div>
            
                        </div>
                        :""}
                    </div>
                </div>
            </div>
        </section>
    )
}
