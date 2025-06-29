import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Divider from './Divider';
import { logout } from '../store/userSlice.js';
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin.js';

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        if (close) {
            close()
        }
    }

    return (
        <div>
            <div className='font-semibold text-left'>My Account</div>
            <div className='text-sm flex items-center gap-2'>

                <span className='max-w-52 text-ellipsis line-clamp-1'>
                    {user.name || user.mobile}
                    <span className='text-medium text-red-600'>
                        {user.role === "ADMIN" ? "(Admin)" : ""}
                    </span>
                </span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-light'>
                    <HiOutlineExternalLink size={15} />
                </Link>
            </div>

            <Divider />

            <div className='text-sm grid gap-1'>
                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/category"} className='text-left px-2 hover:bg-orange-100 py-1'>Category</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/subcategory"} className='text-left px-2 hover:bg-orange-100 py-1'>Sub Category</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/upload-product"} className='text-left px-2 hover:bg-orange-100 py-1'>Upload Product</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/product"} className='text-left px-2 hover:bg-orange-100 py-1'>Product</Link>
                    )
                }

                <Link onClick={handleClose} to={"/dashboard/myorders"} className=' text-left px-2 hover:bg-orange-100 py-1'>My Orders</Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className='text-left px-2 hover:bg-orange-100 py-1'>Save Address</Link>
                <button className='text-left px-2 hover:bg-orange-100' onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    )
}

export default UserMenu
