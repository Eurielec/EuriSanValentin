import React, { Component} from 'react'
import {Form} from 'react-bootstrap'



const FormEnviar = () =>{
    return(
        <>
        <div className='row'>
            <div className='col-md-6 grid-margin stretch-card'>
                <div className='card'>
                    <div className='card-body'>
                        <h3 className='card-Title'> Rellenar aqui</h3>
                        <p className='card-description'> lorem ipsum bla bla</p>
                        <form>
                            <Form.Group>
                                <label> Insrte tu correo de la UPM</label>
                                <Form.Control type="email" className="form-control" placeholder="Email de la UPM"/>
                            </Form.Group>
                            
                            <Form.Group className="row">
                                <label className='col-sm-3 col-form-label'> Para quien es tu piruleta?</label>
                                <div className='col-sm-9'>
                                    <select className="form-control">
                                        <option>Alumno/a</option>
                                        <option>Profesor/a</option>
                                        <option>Pas</option>
                                    </select>

                                </div>
                            </Form.Group>
                            
                            <Form.Group>
                                <label> Como se llama/ Cual es su instagram?</label>
                                <Form.Control type="text" className="form-control" placeholder="Su nombre o ig user"/>
                            </Form.Group>
                            
                            <Form.Group>
                                <label> Puedes darnos mas informacion sobre a quien se la mandamos?</label>
                                <Form.Control type="text" className="form-control" placeholder="Grupo/Despacho/Donde trabaja"/>
                            </Form.Group>

                            <Form.Group>
                                <label> Es tu momento de poner tu notita de amor, si quieres</label>
                                <textarea className='form-control' rows="3"></textarea>
                                
                            </Form.Group>

                            <button type='submit' className='btn btn-primary mr-2'>Enviar</button>
                            <button className='btn btn-light'>Cancel</button>
                        
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormEnviar