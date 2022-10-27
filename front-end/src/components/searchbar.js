import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './searchbar.css';

function SearchBarComponent() {
    return (
        <div className='mt-5' style={{display: 'flex',  justifyContent:'center'}}>
            <Form className="d-flex" style={{minWidth: '30%'}}>
                <Form.Control
                    type="search"
                    placeholder="Search for groups..."
                    className="me-2 searchbar"
                    aria-label="Search"
                    size="lg"
                />
                <Button className="custom-btn2 me-2">Search</Button>
                <Button className="custom-btn2">Filter</Button>
            </Form>
        </div>
    );
}

export default SearchBarComponent;