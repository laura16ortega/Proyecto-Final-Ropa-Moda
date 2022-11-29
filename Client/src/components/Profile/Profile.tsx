import React from 'react';
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import styles from  "./Profile.module.css";

type User = {
    fullName: string;
    email: string,
    isAdmin: boolean,
    userId: string
}

function Profile(props: any) {
    const {user}:any = useAppSelector((state) => state.auth);
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_info}>
                    <p><strong>User Name:</strong>{user.fullName}</p>
                    <p><strong>User Email:</strong>{user.email}</p>
                    <h4>user image</h4>
                </div>
                <div className={styles.sidebar_pages}>
                    <p>User Datos</p>
                    <p>User Orders</p>
                    <p>Update datos</p>
                </div>
            </div>
            <div className={styles.info}>
                <h4>listas</h4>
            </div>
        </div>
    );
}

export default Profile;