import CompanyMenu from './CompanyMenu';
import { HashLink } from 'react-router-hash-link';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { tokenExists } from '../../Redux/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { myServices } from '../../Redux/CompanySlice';
import Loading from '../Loading';
import { useState } from 'react';
import { deleteService } from '../../Redux/CompanySlice';

export default function CompanyManageServices() {
    const { id } = useParams()
    const { token } = useSelector(state => state.user)
    const { data } = useSelector(state => state.company)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        tokenExists(token, navigate, dispatch)
    }, [])

    const fetchcompanyService = () => {
        dispatch(myServices()).unwrap().then(data => {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }).catch((rejectedValueOrSerializedError) => {
            setTimeout(() => {
                setLoading(false)
                toast.error(rejectedValueOrSerializedError)
            }, 1000);
        })
    }

    useEffect(() => {
        fetchcompanyService()
    }, [])

    const handleDeleteService = (serviceId) => {
        const onDeleteConfirm = () => {
            setLoading(true)
            dispatch(deleteService(serviceId)).unwrap().then(data => {
                setTimeout(() => {
                    setLoading(false)
                    if (data.status == 200) {
                        setLoading(false)
                        toast.success(data.msg);
                    } else if (data.status === 403 || data.status === 404) {
                        toast.info(data.msg)
                    } else {
                        toast.error(data.msg)
                    }
                }, 1000);
            }).catch((rejectedValueOrSerializedError) => {
                setTimeout(() => {
                    setLoading(false)
                    toast.error(rejectedValueOrSerializedError)
                }, 1000);
            }).finally(() => {
                fetchcompanyService()
            })
        };

        toast.info(
            <>
                <div style={{ fontSize: "18px", width: "100%", textAlign: "center" }}>Are you sure you want to delete this item ?</div>
                <button style={{
                    width: '100%',
                    backgroundColor: 'var(--toastify-color-info)',
                    color: 'white',
                    outline: 'none',
                    border: 'none',
                    fontSize: '20px',
                    marginTop: '5px',
                    paddingBlock: '5px',
                    borderRadius: '20px',
                    cursor: "pointer"
                }} onClick={onDeleteConfirm}>Yes</button>
            </>,
            {
                position: toast.POSITION.TOP_CENTER
            }
        );
    };
    return (
        <>
            {loading && <Loading />}
            <div className='CompanyManageServices'>
                <div className="container">
                    <div className="section">
                        <HashLink className="go-back-button" to={`/dashboard/company/${id}/services`}><button>Go Back</button></HashLink>
                        <div className="manageHeader">
                            My Services
                        </div>
                        {data?.allServices && data.allServices.length != 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <td>Id</td>
                                        <td>Title</td>
                                        <td>Contact</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.allServices.map((service, i) => <tr key={service._id}>
                                        <td>{i + 1}</td>
                                        <td>{service.title}</td>
                                        <td>{service.price} $</td>
                                        <td>
                                            <NavLink to={`/dashboard/company/${id}/services/update/${service._id}`}><button>Update</button></NavLink>
                                            <button onClick={e => handleDeleteService(service._id)}>Delete</button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                            : <div className='noServices'>You have No Service For Now</div>}

                    </div>
                    <CompanyMenu active="services" />
                </div>
            </div>
        </>

    )
}


