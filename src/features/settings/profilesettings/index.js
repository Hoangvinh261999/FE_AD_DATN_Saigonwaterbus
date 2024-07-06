import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from '../../common/headerSlice'


function ProfileSettings(){


    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Profile Updated", status : 1}))    
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            
            <input title="Thông tin cá nhân" topMargin="mt-2">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input labelTitle="Họ" defaultValue="Phạm" updateFormValue={updateFormValue}/>
                    <input labelTitle="Tên" defaultValue="Đức" updateFormValue={updateFormValue}/>
                    <input labelTitle="Email" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue}/>
                    <input labelTitle="Username" defaultValue="alex" updateFormValue={updateFormValue}/>
                    <input labelTitle="Password" defaultValue="******" updateFormValue={updateFormValue}/>
                    <input labelTitle="Ngày tạo" defaultValue="2022-12-12" updateFormValue={updateFormValue}/>
                </div>
                <div className="divider" ></div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </input>
        </>
    )
}


export default ProfileSettings