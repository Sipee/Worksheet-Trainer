import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Words from './Words'
import Breadcrumb from '../../../app/component/Breadcrumb'

const Worksheet = (props) => (
    <section className="page-content">
        <Breadcrumb lastItem={"Edit worksheet"} push={props.router.push} />

        <div className="panel panel-default">
            <div className="panel-heading">Edit worksheet</div>

            <div className="panel-body">
                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="col-sm-2 control-label">Title</label>
                        
                        <div className="col-sm-10">
                            <Field name="name" component="input" type="text" className="form-control" placeholder="title" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="img" className="col-sm-2 control-label">Image</label>

                        <div className="col-sm-10">
                            <Field name="img" component="input" type="text" className="form-control" placeholder="image" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="col-sm-2 control-label">Description</label>

                        <div className="col-sm-10">
                            <Field name="description" component="textarea" className="form-control" placeholder="description" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Words</label>

                        <div className="col-sm-10">
                            <Words 
                                words={props.initialValues.words}
                                push={props.router.push}
                                page={props.page}
                                updatePage={props.updatePage}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-app">Edit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
)

const WorksheetForm = reduxForm({
    form: 'worksheet_editor'
})(Worksheet);

export default WorksheetForm
