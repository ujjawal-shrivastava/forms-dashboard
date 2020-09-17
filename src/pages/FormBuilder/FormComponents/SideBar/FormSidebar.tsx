import React, { useState, useContext, useEffect } from 'react'
import SidebarItem from './SidebarItem'
import { FormContext } from '../../FormContext'
import SectionAdd from '../AddComponent/SectionAdd'
import FieldAdd from '../AddComponent/FieldAdd'
import Msgpack from 'msgpack-lite';
import { encode as bencode, decode as bdecode } from 'base65536';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'
import { toast as superToast } from 'bulma-toast'
import { withRouter } from 'react-router-dom'
import { v4 } from 'uuid'
import ShareDialog from '../../../../components/ShareDialog'
import ConfirmDialog from '../../../../components/ConfirmDialog'

const SAVE = gql`
  mutation saveForm($input:SaveForm!) {
    saveForm(input:$input) {
      formid
      title
      description
      author{
          name
      }
      data
      bgtheme
      open
      views
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
      published
      views
      responses
      added
      updated
    }

  }
`;

const PUBLISH = gql`
  mutation publishForm($formid:String) {
    publishForm(formid:$formid)
  }
`;

const UNPUBLISH = gql`
  mutation unpublishForm($formid:String) {
    unpublishForm(formid:$formid)
  }
`;


const FormSidebar = withRouter((props: any) => {
    props = { ...props }
    const { data: getData, loading: getLoading, error: getError, refetch: getRefetch } = useQuery(FORM, { errorPolicy: 'all', skip: !props.match.params.id, variables: { formid: props.match.params.id } });
    const [state, setState] = useContext(FormContext)
    const [saved, setSaved] = useState(true)
    const [sectionActive, setSectionActive] = useState(false)
    const [addActive, setAddActive] = useState(false)
    const [api_save, { data, loading: saveLoading, error }] = useMutation(SAVE, { errorPolicy: 'all' });
    const [api_publish, { data: publish_data, loading: publishLoading, error: publish_error }] = useMutation(PUBLISH, { errorPolicy: 'all' });
    const [api_unPublish, { data: unpublish_data, loading: unpublishLoading, error: unpublish_error }] = useMutation(UNPUBLISH, { errorPolicy: 'all' });
    const [formError, setFormError] = props.formError
    const [formId, setFormId] = props.formid
    const [shareActive, setShareActive] = useState(false)
    const [publishActive, setPublishActive] = useState(false)
    const [unpublishActive, setUnpublishActive] = useState(false) 
    const [notFound, setNotFound] = props.notFound
    
    useEffect(() => {

        if (props.location.pathname !== "/create" && getData && !getError) {
            console.log(getData)
            setState({
                formid: getData.getForm.formid,
                title: getData.getForm.title,
                description: getData.getForm.description,
                bgtheme: getData.getForm.bgtheme,
                isOpen: getData.getForm.open,
                isPublished: getData.getForm.published,
                sections: Msgpack.decode(bdecode(getData.getForm.data)),
                views:getData.getForm.views,
                responses:getData.getForm.responses,
                added:getData.getForm.added,
                updated:getData.getForm.updated

            })
            setSaved(true)
        }
        else {
            setState({
                formid: "",
                title: "",
                description: "",
                bgtheme: "#2ecc71",
                isOpen: true,
                isPublished: false,
                sections: [
                    {
                        id: v4(),
                        title: "",
                        components: []
                    },
                ],
                views:0
            })
        }
    }, [getData, getError])

    useEffect(() => {
        validateTitle(state.title)
        validateDesc(state.description)
        setSaved(false)
        setFormId(state.formid)
    }, [state])

    useEffect(() => {
        window.onbeforeunload = confirmExit;
        function confirmExit() {
            if (!saved) return "show warning";
            else return null
        }

        return (() => {
            window.onbeforeunload = null
        })
    }, [saved])

    const addItem = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        setAddActive(true)
    }

    const validateTitle = (value: string) => {
        const regex = /^.{1,150}$/
        setFormError((current: any) => {
            const newError = { ...current }
            newError.title = regex.test(value) ? "" : "Title cannot be empty and should be less than 150 chars!"
            return newError
        })
    }

    const validateDesc = (value: string) => {
        const regex = /.{1,}/
        setFormError((current: any) => {
            const newError = { ...current }
            newError.description = regex.test(value) ? "" : "Description cannot be empty!"
            return newError
        })
    }

    const addSection = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        setSectionActive(true)
    }

    const showPreview = () => {
        sessionStorage.setItem("preview", bencode(Msgpack.encode(state)));
        window.open("/preview", "_blank")
    }

    const handleModalClose = () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setPublishActive(false)
        setShareActive(false)
        setUnpublishActive(false)
    }

    const publish = () => {
        handleModalClose()
        if (!saved) {
            superToast({
                message: `Unsaved changes! Save the Form to Publish.`,
                type: "is-black",
                position: "top-center",
                duration: 2000,
                animate: { in: 'fadeIn', out: 'fadeOut' },
                dismissible: true,
                pauseOnHover: true
            });

            return
        }
        api_publish({ variables: { formid: state.formid } }).then((publish_data) => {
            if (publish_data) {
                getRefetch()
                superToast({
                    message: `Form Published!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                });
                setSaved(true)
                setShareActive(true)
            }
        })

    }

    const unpublish = () => {
        handleModalClose()
        if (!saved) {
            superToast({
                message: `Unsaved changes! Save the Form to Unpublish.`,
                type: "is-black",
                position: "top-center",
                duration: 2000,
                animate: { in: 'fadeIn', out: 'fadeOut' },
                dismissible: true,
                pauseOnHover: true
            });

            return
        }
        api_unPublish({ variables: { formid: state.formid } }).then((unpublish_data) => {
            if (unpublish_data) {
                getRefetch()
                superToast({
                    message: `Form Unpublished!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                });
                setSaved(true)
            }
        })

    }

    const saveForm = () => {

        if (saved) return
        if (formError.title || formError.description) {
            superToast({
                message: `Title and Description cannot be empty!`,
                type: "is-black",
                position: "top-center",
                duration: 2000,
                animate: { in: 'fadeIn', out: 'fadeOut' },
                dismissible: true,
                pauseOnHover: true
            });
            return
        }
        api_save({
            variables: {
                input: {
                    formid: state.formid,
                    title: state.title,
                    description: state.description,
                    bgtheme: state.bgtheme,
                    open: state.isOpen,
                    data: bencode(Msgpack.encode(state.sections))

                }
            }
        }).then(({ data, errors }) => {
            if (!errors) {

                setSaved(true)
                superToast({
                    message: `Great!, You have successfully saved the form!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                });
                props.history.push(`/edit/${data.saveForm.formid}`)
            }
        });
    }

    if (getError) {
        setNotFound(true)
    }

    return (

        <div className="column is-one-fifth toolbar" style={{ top: `${props.navHidden ? ((window.innerWidth < 800) ? "-180px" : "-1rem") : "3rem"}` }}>
            {shareActive ? <ShareDialog isActive={[shareActive, setShareActive]} form={state.formid} /> : ""}
            <div className="box  mt-4" style={{
                padding: "0.5rem",
                backgroundColor: "#4d4d4d",
                maxHeight: "100%",
                overflowX: "hidden",
                display: "flex",
                justifyContent: "center",
            }}>
                {sectionActive ? <SectionAdd isActive={[sectionActive, setSectionActive]} /> : <div></div>}
                {addActive ? <FieldAdd isActive={[addActive, setAddActive]} /> : <div></div>}
                {publishActive ? <ConfirmDialog title="Publish Form" desc="Once the form is published, you won't be able to edit the fields. Are you sure you want to publish the form?" button1="Publish" isActive={[publishActive, setPublishActive]} func={publish} /> : null}
                {unpublishActive ? <ConfirmDialog title="Unpublish Form" desc="Once the form is unpublished, people won't be submit responses. Are you sure you want to unpublish the form?" button1="Unpublish" isActive={[unpublishActive, setUnpublishActive]} func={unpublish} /> : null}
                <div className="toolbar-list">
                    {state.isPublished ? <SidebarItem icon="fa-share-alt" text="Share" clickHandler={() => { setShareActive(true) }} /> : <SidebarItem icon="fa-plus" text="Field" clickHandler={addItem} />}
                    {state.isPublished ? <SidebarItem icon="fa-list-ul" text="Responses" clickHandler={publish} /> : <SidebarItem icon="fa-file-o" text="Section" clickHandler={addSection} />}
                    <SidebarItem icon={saved ? "fa-check" : "fa-floppy-o"} text={saved ? "Saved" : (saveLoading ? "Saving" : "Save")} clickHandler={saveForm} />
                    <SidebarItem icon="fa-share" text="Export" tag="TODO" />
                    <SidebarItem icon="fa-eye" text="Preview" clickHandler={showPreview} />
                    {state.isPublished ? <SidebarItem icon="fa-ban" text="Unpublish" clickHandler={() => { setUnpublishActive(true) }} /> : <SidebarItem icon="fa-globe" text="Publish" clickHandler={() => { setPublishActive(true) }} />}
                </div>
            </div>
        </div>
    )
})

export default FormSidebar
