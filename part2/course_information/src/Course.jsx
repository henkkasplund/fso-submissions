const Part = ({ part }) => <p>{ part.name } { part.exercises }</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={ part.id } part={ part }/>)}
    </div>
  )
}

const Statistics = ({ parts }) => {
  return (
    <div>
      <strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
    </div>
  )
}

const Header = ({ name }) => <h2>{ name }</h2>

const Course = ({ course }) => {
  return (
    <div>
      <Header name={ course.name } />
      <Content parts={ course.parts } />
      <Statistics parts={ course.parts }/>
    </div>
  )
}

export default Course