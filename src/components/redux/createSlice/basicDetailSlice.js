import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, orderBy, onSnapshot, addDoc, where, Timestamp } from "firebase/firestore";
import { act } from "react-dom/test-utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../FireBase';
const user = auth.currentUser;
const   initialState = {
    loading : false,
    error:'',
    detailedItem: {
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
}
const firebasePromise =async () =>{
    const user = auth.currentUser;
    const resumeColRef = query(collection(db, 'MLMnirresumebuilder' + user.uid));
  const main = await onSnapshot(resumeColRef, (snapshot) => {
       const cat = snapshot.docs.map(doc => ({
             id: doc.id,
             dateofbirth: new Date(doc.data().dateofbirth.toDate()).toLocaleString('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}),
             data: doc.data()
         }))
         return cat
        
     })
     return main

}
const fetchdetails = createAsyncThunk('basicdetail/fetchdetails', async () => {
const data2 = await firebasePromise();
console.log(JSON.stringify(data2));
return data2

})
export const basicdetailsSlice = createSlice({
    name: 'basicdetails',
    initialState,
    // extraReducers: (builder) => {
    //     builder.addCase(fetchdetails.pending, (state) => {
    //         //state.detailedItem = []
    //         state.loading = true
    //         console.log('pending')
    //     })
    //     builder.addCase(fetchdetails.fulfilled, (state, action) => {
    //         state.detailedItem = action.payload
    //         state.loading = false
    //         state.error = ''
    //         console.log('success' + state.detailedItem)
    //     })
    //     builder.addCase(fetchdetails.rejected, (state, action) => {
    //         state.detailedItem = []
    //         state.loading = false
    //         state.error = ''
    //         console.log('rejected' + action.error.message)
    //     })
    // },
    reducers: {
        AddBasicDetails: (state, action) => {
            state.detailedItem = action.payload;
            try {
                if (user) {
                    addDoc(collection(db, "MLMnirresumebuilder" + user.uid), {
                        userid: user.uid,
                        basicdetails: state.detailedItem,
                    }).then(
                        console.log('red' + ' - ' + "Successfully Added"),
                        // reset()
                    ).catch(err => alert(err.message))
                }
                else {
                    console.log('user is not signed in to add todo to database');
                }


            } catch (err) {
                alert(err)
            }

        },
        EditBasicDetails: (state) => {
            state.value += 1
        },
        UpdateBasicDetails: (state) => {
            state.value += 1
        },
        DeleteBasicDetails: (state) => {
            state.value += 1
        },
        FetchBasicDetails : (state,action) =>{
            state.detailedItem = action.payload
        }
       

    }
})


export const { AddBasicDetails, EditBasicDetails, UpdateBasicDetails, DeleteBasicDetails, FetchBasicDetails } = basicdetailsSlice.actions;
export const userlist = (state) => state.basicdetails.detailedItem
// export const fetchuserlist = fetchdetails
export default basicdetailsSlice.reducer
