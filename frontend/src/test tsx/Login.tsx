import React from 'react'
import { useFormik, Form, Field, FormikProps } from 'formik'

interface FormValues {
    email: string;
    password: string;
}

const Login = (props: FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting } = props

    return (
        <Form>
            <h1>Login</h1>
            <Field type="email" name="email" />
            {touched.email && errors.email && <div>{errors.email}</div>}
        
            <Field type="password" name="password" />
            {touched.password && errors.password && <div>{errors.password}</div>}
        
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>
    );
};

export default Login