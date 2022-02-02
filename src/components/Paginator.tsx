import './styles/paginator.css'
import Arrow from '../assets/icons/arrow'

export const Paginator: React.FC = () => {
    return (
        <div className="paginator__container">
            <div className="paginator__control paginator__control--left">
                <Arrow direction='left'/>
                Previous
            </div>
            <p className="paginator__value">
                <span className="paginator__currentPage">1</span>{' of '}
                <span className="paginator__totalPages">14</span>
            </p>
            <div className="paginator__control paginator__control--right">
                <span>Next</span>
                <Arrow direction='right' />
            </div>
        </div>
    )
}