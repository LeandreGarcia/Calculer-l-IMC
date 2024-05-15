import React, {useState} from 'react';
import './IMCCalculator.css';

function IMCCalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState(null);
    const [containerClass, setContainerClass] = useState('container');

    const calculateIMC = () => {
        const weightFloat = parseFloat(weight);
        const heightMeters = parseFloat(height) / 100;

        if (isNaN(weightFloat) || isNaN(heightMeters) || weightFloat <= 0 || heightMeters <= 0) {
            setResult(null);
            setContainerClass('container');
            return;
        }

        if (weightFloat && heightMeters) {
            const imc = weightFloat / (heightMeters ** 2);

            let category = '';
            if (imc < 18.5) {
                category = 'Insuffisance pondérale';
                setContainerClass('container insuffisant')
            } else if (imc < 25) {
                category = 'Corpulence normale';
                setContainerClass('container normal')
            } else if (imc < 30) {
                category = 'Surpoids';
                setContainerClass('container surpoids')
            } else if (imc < 35) {
                category = 'Obésité modérée';
                setContainerClass('container obesite-modere')
            } else if (imc < 40) {
                category = 'Obésité sévère';
                setContainerClass('container obesite-severe')
            } else {
                category = 'Obésité morbide';
                setContainerClass('container obesite-morbide')
            }

            setResult({
                imc: imc.toFixed(2),
                category: category
            });
        } else {
            setResult(null)
            setContainerClass('container')
        }
        };

    return (
        <div className={containerClass}>
            <h1>Calculateur d'IMC</h1>
            <label>Poids (kg): </label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}></input>
            <br />
            <label>Taille (cm): </label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}></input>
            <br />
            <button onClick={calculateIMC}>Calculer</button>

            {result && (
                <div>
                    <p>Ton IMC est: <strong>{result.imc}</strong></p>
                    <p>Catégorie: <strong>{result.category}</strong></p>
                </div>
            )}

        </div>
    )
    }

export default IMCCalculator;