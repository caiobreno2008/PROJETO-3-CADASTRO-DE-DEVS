const developerForm = document.getElementById('developerForm')
const technologiesContainer = document.getElementById('technologiesContainer')
const addTechButton = document.getElementById('addTechButton')
const devList = document.getElementById('devList')

let developers = []

function addTechnology() {
  const techRow = document.createElement('div')
  techRow.classList.add('tech-row')

  const techNameInput = document.createElement('input')
  techNameInput.type = 'text'
  techNameInput.name = 'techName'
  techNameInput.placeholder = 'Nome da Tecnologia'
  techNameInput.required = true

  const experienceGroup = document.createElement('div')

  const experienceOptions = ['0-2 anos', '3-4 anos', '5+ anos']
  experienceOptions.forEach(option => {
    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = `experience${Date.now()}`
    radio.value = option

    const label = document.createElement('label')
    label.textContent = option
    experienceGroup.appendChild(radio)
    experienceGroup.appendChild(label)
  })

  const removeButton = document.createElement('button')
  removeButton.textContent = 'Remover'
  removeButton.type = 'button'
  removeButton.addEventListener('click', function () {
    techRow.remove()
  })

  techRow.appendChild(techNameInput)
  techRow.appendChild(experienceGroup)
  techRow.appendChild(removeButton)

  technologiesContainer.appendChild(techRow)
}

addTechButton.addEventListener('click', addTechnology)

developerForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const devName = document.getElementById('devName').value

  const technologies = []
  document.querySelectorAll('.tech-row').forEach(row => {
    const techName = row.querySelector('input[name="techName"]').value
    const experience = [...row.querySelectorAll('input[type="radio"]:checked')]
      .map(radio => radio.value)
      .join(', ')

    if (techName && experience) {
      technologies.push({ techName, experience })
    }
  })

  const developer = { name: devName, technologies }
  developers.push(developer)

  renderDeveloperList()

  technologiesContainer.innerHTML = ''
})

function renderDeveloperList() {
  devList.innerHTML = ''
  developers.forEach(dev => {
    const devItem = document.createElement('div')
    const devName = document.createElement('h3')
    devName.textContent = `Desenvolvedor: ${dev.name}`
    devItem.appendChild(devName)

    dev.technologies.forEach(tech => {
      const techItem = document.createElement('p')
      techItem.textContent = `Tecnologia: ${tech.techName} | Tempo de experiência: ${tech.experience}`
      devItem.appendChild(techItem)
    })

    devList.appendChild(devItem)
  })
}
