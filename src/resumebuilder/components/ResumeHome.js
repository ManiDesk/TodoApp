import React, { useState } from "react";
import Header from "../../components/Header";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Editor } from 'primereact/editor';
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../components/FireBase'
// import SuceessMessage from "./auth/SuccessMessage";

import { toast } from 'react-toastify';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import { TabView, TabPanel } from 'primereact/tabview';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
function ResumeHome() {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [text1, setText1] = useState('');
    const [user, error] = useAuthState(auth);
    const onLoadingClick = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    const defaultValues = {
        name: '',
        email: '',
        altemail: '',
        mobile: '',
        altmobile: '',
        title: '',
        location: '',
        totalExperience: '',
        releventExperience: '',
        nationality: '',
        dateofbirth: '',
        address: '',
        aboutme: '',
        carreerobj: '',
        websiteurl: '',
        linkedinUrl: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        githubUrl: '',
        otherUrl: '',
        country: '',
        state: '',
        pincode: ''
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);
        console.log(data)
        setShowMessage(true);
       
        try {


            if (user) {
                addDoc(collection(db, "nirresumebuilder" + user.uid), {
                     userid: user.uid,
                     basicdetails : data,                   
                }).then(
                    toast.success('red' + ' - ' + "Successfully Added"),
                    reset()
                ).catch(err => alert(err.message))
            }
            else {
                console.log('user is not signed in to add todo to database');
            }


        } catch (err) {
            alert(err)
        }
        //reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <React.Fragment>
            <Header />
            <section className="bodyPadmain">
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-heaer">
                                    <h6 className="m-0">Add Resume</h6>
                                </div>
                                <div className="card-body p-0">
                                    <TabView>
                                        <TabPanel header="Basic Details" leftIcon="pi pi-calendar mr-2">
                                            <div className="p-2">
                                                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                                    <div className="row">
                                                        {/* name  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                                                                    <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} autoFocus className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('name')}
                                                            </div>
                                                        </div>
                                                        {/* Email  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                                                                <span className="p-form p-input-icon-right">

                                                                    <i className="pi pi-envelope" />

                                                                    <Controller name="email" control={control}
                                                                        rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                                                        render={({ field, fieldState }) => (
                                                                            <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                        )} />

                                                                </span>
                                                                {getFormErrorMessage('email')}
                                                            </div>
                                                        </div>
                                                        {/* Alt Email  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <label htmlFor="altemail" className={classNames({ 'p-error': !!errors.altemail })}>Alternative Email*</label>
                                                                <span className="p-form p-input-icon-right">

                                                                    <i className="pi pi-envelope" />

                                                                    <Controller name="altemail" control={control}
                                                                        rules={{required: false, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                                                        render={({ field, fieldState }) => (
                                                                            <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                        )} />

                                                                </span>
                                                                {getFormErrorMessage('altemail')}
                                                            </div>
                                                        </div>
                                                        {/* mobile  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="mobile" className={classNames({ 'p-error': errors.mobile })}>Mobile Number*</label>
                                                                    <Controller name="mobile" control={control} rules={{ required: 'Mobile number is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText keyfilter="num" id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('mobile')}
                                                            </div>
                                                        </div>
                                                        {/* alt Mobile */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="altmobile" className={classNames({ 'p-error': errors.altmobile })}>Alternative Mobile number*</label>
                                                                    <Controller name="altmobile" control={control} rules={{required: false }} render={({ field, fieldState }) => (
                                                                        <InputText keyfilter="num" id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('altmobile')}
                                                            </div>
                                                        </div>
                                                        {/* title  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>Title*</label>
                                                                    <Controller name="title" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('title')}
                                                            </div>
                                                        </div>
                                                        {/* location  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="location" className={classNames({ 'p-error': errors.location })}>Location *</label>
                                                                    <Controller name="location" control={control} rules={{ required: 'Location is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('location')}
                                                            </div>
                                                        </div>
                                                        {/* totalExperience  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="totalExperience" className={classNames({ 'p-error': errors.totalExperience })}>Total Year Experience*</label>
                                                                    <Controller name="totalExperience" control={control} rules={{ required: 'Total Experience is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText keyfilter="num" id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('totalExperience')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="releventExperience" className={classNames({ 'p-error': errors.releventExperience })}>Relevent Experience*</label>
                                                                    <Controller name="releventExperience" control={control} rules={{ required: 'Relevent Experience is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText keyfilter="num" id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('releventExperience')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="nationality" className={classNames({ 'p-error': errors.nationality })}>Nationality*</label>
                                                                    <Controller name="nationality" control={control} rules={{ required: 'Nationality is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('nationality')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="country" className={classNames({ 'p-error': errors.country })}>Country*</label>
                                                                    <Controller name="country" control={control} rules={{ required: 'Country is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('country')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="state" className={classNames({ 'p-error': errors.state })}>State*</label>
                                                                    <Controller name="state" control={control} rules={{ required: 'sState is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('state')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="pincode" className={classNames({ 'p-error': errors.pincode })}>Pincode*</label>
                                                                    <Controller name="pincode" control={control} rules={{ required: 'Nationality is required.' }} render={({ field, fieldState }) => (
                                                                        <InputText keyfilter="num" id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('pincode')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="dateofbirth" className={classNames({ 'p-error': errors.dateofbirth })}>Date of birth</label>
                                                                    <Controller name="dateofbirth" control={control} rules={{ required: 'Date of birth is required.' }} render={({ field, fieldState }) => (
                                                                        <Calendar id={field.name} value={field.value} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                                                    )} />
                                                                </span>
                                                                {getFormErrorMessage('dateofbirth')}
                                                            </div>
                                                        </div>
                                                        {/* website ulr  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="websiteurl" className={classNames({ 'p-error': errors.websiteurl })}>Website Url*</label>
                                                                    <Controller name="websiteurl" control={control} rules={{ required: false }} render={({ field, fieldState }) => (
                                                                        <InputText  id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('websiteurl')}
                                                            </div>
                                                        </div>
                                                        {/* facebook ulr  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="facebookUrl" className={classNames({ 'p-error': errors.facebookUrl })}>Facebook Url*</label>
                                                                    <Controller name="facebookUrl" control={control} rules={{ required: false }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('facebookUrl')}
                                                            </div>
                                                        </div>
                                                        {/* website ulr  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="linkedinUrl" className={classNames({ 'p-error': errors.linkedinUrl })}>linkedin Url*</label>
                                                                    <Controller name="linkedinUrl" control={control} rules={{ required: false }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('linkedinUrl')}
                                                            </div>
                                                        </div>
                                                        {/* twitterUrl ulr  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="twitterUrl" className={classNames({ 'p-error': errors.twitterUrl })}>Twitter Url*</label>
                                                                    <Controller name="twitterUrl" control={control} rules={{ required: false }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('twitterUrl')}
                                                            </div>
                                                        </div>
                                                        {/* instagramUrl ulr  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="instagramUrl" className={classNames({ 'p-error': errors.instagramUrl })}>Instagram Url*</label>
                                                                    <Controller name="instagramUrl" control={control} rules={{ required: false}} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('instagramUrl')}
                                                            </div>
                                                        </div>
                                                        {/* githubUrl ulr  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="githubUrl" className={classNames({ 'p-error': errors.instagramUrl })}>Github Url*</label>
                                                                    <Controller name="githubUrl" control={control} rules={{ required: false }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('githubUrl')}
                                                            </div>
                                                        </div>
                                                        {/* otherurl ulr  */}
                                                        <div className="col-md-4">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="otherUrl" className={classNames({ 'p-error': errors.otherUrl })}>Other Url*</label>
                                                                    <Controller name="otherUrl" control={control} rules={{ required: false }} render={({ field, fieldState }) => (
                                                                        <InputText id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('otherUrl')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="address" className={classNames({ 'p-error': errors.address })}>Address*</label>
                                                                    <Controller name="address" control={control} rules={{ required: 'Address is required.' }} render={({ field, fieldState }) => (

                                                                        <InputTextarea rows={5} cols={30} id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('address')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="aboutme" className={classNames({ 'p-error': errors.aboutme })}>About me*</label>
                                                                    <Controller name="aboutme" control={control} rules={{ required: 'About me is required.' }} render={({ field, fieldState }) => (

                                                                        <InputTextarea rows={5} cols={30} id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('aboutme')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="field mb-3">
                                                                <span className="p-form">
                                                                    <label htmlFor="carreerobj" className={classNames({ 'p-error': errors.carreerobj })}>Carreer Objective*</label>
                                                                    <Controller name="carreerobj" control={control} rules={{ required: 'Carreer Objective is required.' }} render={({ field, fieldState }) => (

                                                                        <InputTextarea rows={5} cols={30} id={field.name} {...field} className={`p-inputtext-sm ${classNames({ 'p-invalid': fieldState.invalid })}`} />
                                                                    )} />

                                                                </span>
                                                                {getFormErrorMessage('carreerobj')}
                                                            </div>
                                                        </div>




                                                    </div>
                                                    <div className="">
                                                        <Button type="submit" label="Submit" />

                                                        {/* <Button type="submit" label="Submit" className="mt-2" /> */}
                                                    </div>
                                                </form>

                                            </div>
                                        </TabPanel>
                                        <TabPanel header="Header II" rightIcon="pi pi-user ml-2">
                                            <p className="m-0">
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                                                ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                            </p>
                                        </TabPanel>
                                        <TabPanel header="Header III" leftIcon="pi pi-search mr-2" rightIcon="pi pi-cog ml-2">
                                            <p className="m-0">
                                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                                                quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                                culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                                            </p>
                                        </TabPanel>
                                    </TabView>

                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default ResumeHome;