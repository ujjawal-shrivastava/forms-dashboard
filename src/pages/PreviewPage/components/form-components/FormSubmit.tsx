import React from 'react';

export default function FormSubmit(){

    return(
        <div className="container mt-5" id="form-submit">
                <div className="box">
                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" />
                    <span>I agree to the <a href="/terms" target="_blank">terms and conditions</a>.</span>
                      </label>
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                      <button className="button is-link is-light">Review</button>
                    </div>
                    <div className="control">
                      <button className="button is-link is-light">Clear</button>
                    </div>
                  </div>
                </div>
              </div>
    )
}