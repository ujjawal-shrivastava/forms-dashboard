import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'
import { toast as superToast } from 'bulma-toast'

const CHANGE_NAME = gql`
  mutation changeName($name:String!) {
    changeName(name:$name) {
      email
      name
    }

  }
`;

export default function ChangeName(props: any) {
    const [user, setUser] = useContext(UserContext)
    const [name, setName] = useState(user.name)
    const [nameError, setNameError] = useState("")
    const [isActive, setIsActive] = props.isActive

    const [changeName, { }] = useMutation(CHANGE_NAME, { errorPolicy: 'all' });


    const handleName = (value: string) => {
        setName(value)
        setNameError(() => {
            let regexp: RegExp = /\w{1,}/
            const newerror = regexp.test(value) ? "" : "Name cannot be empty and can only contain aplhabets."
            return newerror
        })
    }

    const handleChange = () => {
        if (nameError) return
        changeName({ variables: { name: name }}).then(({ data, errors }) => {
            if (!errors) {
                var newUser = { ...user }
                newUser.name = name
                setUser(newUser)
                sessionStorage.setItem("user", JSON.stringify(newUser))
                if (newUser.long) localStorage.setItem("user", JSON.stringify(newUser))
                superToast({
                    message: `Successfully changed name for ${newUser.email}!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                  });
                handleClose()
        }
    }
        )}


    const handleClose = () => {
            setIsActive(false)
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return (
            <div className={`modal ${isActive ? "is-active" : ""}`} onKeyPress={(event) => {
                var code = event.keyCode || event.which
                if (code === 13) handleChange()
            }}>
                <div className="modal-background"></div>
                <div className="modal-card" style={{ maxWidth: "90%" }}>
                    <header className="modal-card-head">
                        <p className="modal-card-title is-size-5 has-text-weight-semibold">Change Display Name</p>
                        <button onClick={handleClose} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label is-normal">New Name</label>
                            <div className="control field-body">
                                <input className={`input ${nameError ? "is-danger" : ""}`} type="text" placeholder="New Name" value={name} onChange={(e) => { handleName(e.target.value) }} />
                            </div>
                            <p className="help is-danger">{nameError}</p>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={handleChange}>Change Name</button>
                        <button className="button" onClick={handleClose}>Cancel</button>
                    </footer>
                </div>
            </div>

        )
    }
