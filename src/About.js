import { Card } from 'react-bootstrap'

export default function About () {
  return (
    <Card style={{ margin: '20px '}}> 
      <Card.Header>Author</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            Student Name: Yuhuan (Evan) Zhou
            <br/>
            Student ID: 149528192
          </p>
          <footer className="blockquote-footer">
            Someone study hard in the midnight
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    
    )
}