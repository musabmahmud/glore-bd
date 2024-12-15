import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const tokenAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDg2MmM3NzQ0NGUwYzk1YmRjOWFlMzY3Y2Y1YmYyNTczZTdmMWViOGI1Y2YyMmYxNjM1ZDMxNjc4OTBmZjdiYWY4MGI0NGQxMzE0OWNlODkiLCJpYXQiOjE3MzM5MTIyNjUuNDcxMTU0OTI4MjA3Mzk3NDYwOTM3NSwibmJmIjoxNzMzOTEyMjY1LjQ3MTE1NzA3Mzk3NDYwOTM3NSwiZXhwIjoxNzY1NDQ4MjY1LjQ2ODUxMTEwNDU4Mzc0MDIzNDM3NSwic3ViIjoiMSIsInNjb3BlcyI6W119.YBBZHEGJ-J6uk39iAKc6DufnJhqi8gpsda6imwncGx8UqVPBDLA1nzAi3Lbg36x59fMJNEH3HqowyUKKPPkQtv10uvoIdaiGreZE6d8t3-TeksF35o0cKxD8ZWEpsLv_iv3dBd0_inSWkE4s56gzAtppLa_y41I7I77fBxMOhjW61CaSIQSIZbr_uiUDZ4hbFw_FIlZpzbA28J5GvjFsA6LMjg_AzwJazmwbqyc5IXxoFxiLl-CG734_WR-W2Pod0pb1LJ9HZH5yoozror2mUQG1WwNTVNQ_D29Ss6UhLGPAAbcKvwuJqgbbBPNIqp9Zw7_yiehS8b5ZZ0i74yLIVEiLfGWvx-d_6ZaDOQHV_QEbj_Im8LE0eGnazpclDDkpYg7wfh7HgQhhBtvMbIYHg4x9-WVNpi82IIaE6eTLSoF4sA1lzt6KOKPZy-pT2q1OJ23kKibfvegP3jMleXTBMV-mLzrtPD39mlB-kuf6b2ou0MFsM6_-0IJAb39uPxJYa_KPQYo6fJWf1vtaidpf-eVcK4UMbuMQNgJYPVQEN4H5qkE232XMPmhlTufgAeoGeji7xpSXV8-EVr98d0jOaZ6YM1kxNLGl3MqKEjJjGWbipRsUJ6O4s4RIy5gSM3cGVjhiryyUWSOUOGkTPvSLEcmUFJHLWH6TPJ_gp4RExgA";

    const authData = JSON.parse(localStorage.getItem('auth'));

    const tokenFromDatabase = authData?.token.trim();
    const mine = tokenAPI.trim();

    // Check if the user is authenticated and is an admin
    if (authData?.isAuthenticated === true && tokenFromDatabase != mine) {
        // If authenticated, allow access to the protected route
        return children;
    }
    else {
        return <Navigate to="/login" replace />;
    }

};

export default ProtectedRoute;

