// top-level component of SLR Parser Visualization

import React, { useState } from 'react'
import './index.css'
import { computeAutomation, computeParseTable, computeFirstFollow } from './compute'
import { InputGrammar } from './InputGrammar'
import { Automation } from './Automation'
import { ParseTable } from './ParseTable'
import { ParseExpression } from './ParseExpression'

export const LRgramma = () => {
    const [grammar, setGrammar] = useState({
        productions: [
            ['S\'', '::=', 'S'],
            ['S', '::=', '(', 'L', ')'],
            ['S', '::=', 'x'],
            ['L', '::=', 'S'],
            ['L', '::=', 'L', ';', 'S']
        ],
        productionMap: new Map([
            ['S\'', [0]],
            ['S', [1, 2]],
            ['L', [3, 4]],
        ]),
        terminalSet: new Set(['(', ')', 'x', ';', '$'])
    })
    const [automation, setAutomation] = useState(null)
    const [firstFollow, setFirstFollow] = useState(null)
    const [parseTable, setParseTable] = useState(null)
    const [automationDots, setAutomationDots] = useState(null)


    const grammarUpdated = (grammar) => {
        const { automation, automationDots } = computeAutomation(grammar)
        const firstFollow = computeFirstFollow(grammar)
        const parseTable = computeParseTable(grammar, automation, firstFollow)
        setGrammar(grammar)
        setAutomation(automation)
        setFirstFollow(firstFollow)
        setParseTable(parseTable)
        setAutomationDots(automationDots)
    }

    if(automation === null) 
        grammarUpdated(grammar)

    return (
        <div className='LRGrammar'>
            <h1 className='header'>SLR Parser Visualization</h1>
            <InputGrammar  grammarUpdated={grammarUpdated}/>  
            <Automation automationDots={automationDots}/>
            <ParseTable grammar={grammar} firstFollow={firstFollow} parseTable={parseTable}/>
            <ParseExpression grammar={grammar} parseTable={parseTable}/>
        </div>
    )
}