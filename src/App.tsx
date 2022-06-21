import { useState } from 'react'
import styles from './App.module.css'
import poeweredImage from './assets/powered.png'
import arrowImage from './assets/leftarrow.png'

import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem'

export const App = () => {

  const [heightField, setHeight] = useState<number>(0)
  const [weightField, setWeight] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculateImc = () => {
    if(heightField && weightField) {
        setToShow(calculateImc(heightField, weightField))
    } else {
      alert('Digite todos os campos.')
    }
  } 

  const handleBackButton = () => {
    setToShow(null)
    setHeight(0)
    setWeight(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poeweredImage} alt="logo" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftside}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <input type="number"
          placeholder='Digite sua altura. Ex: 1.5 (em metros)' 
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeight(parseFloat(e.target.value))}
          disabled={!!(toShow)}
          />
          <input type="number"
          placeholder='Digite seu peso. Ex: 1.55 (em kg)' 
          value={weightField > 0 ? weightField : ''}
          onChange={e => setWeight(parseFloat(e.target.value))}
          disabled={!!(toShow)}
          />
          <button onClick={handleCalculateImc} 
          disabled={!!(toShow)}
          >Calcular</button>
        </div>
        <div className={styles.rightside}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) => (
                <GridItem key={key}  item={item}/>
            ))}
          </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={arrowImage} alt="seta de voltar" width={25} />
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
} 