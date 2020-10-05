const godsSyllables = [
  ['AE', 'OL', 'US'],
  ['AE', 'THER'],
  ['AL', 'AS', 'TOR'],
  ['A', 'POL', 'LO'],
  ['AR', 'ES'],
  ['A', 'RIST', 'AEUS'],
  ['A', 'TLAS'],
  ['AT', 'TIS'],
  ['BO', 'REAS'],
  ['CAE', 'RUS'],
  ['CAS', 'TOR'],
  ['CE', 'RUS'],
  ['CHA', 'OS'],
  ['CHA', 'RON'],
  ['CRO', 'NOS'],
  ['CRI', 'OS'],
  ['CRO', 'NUS'],
  ['DIN', 'LAS'],
  ['DEI', 'MOS'],
  ['DIO', 'NY', 'SUS'],
  ['E', 'RE', 'BUS'],
  ['E', 'ROS'],
  ['EU', 'RUS'],
  ['GLAU', 'CUS'],
  ['HA', 'DES'],
  ['HE', 'LIOS'],
  ['HE', 'PHAE', 'STUS'],
  ['HE', 'RA', 'CLES'],
  ['HER', 'MES'],
  ['HES', 'PER', 'US'],
  ['HY', 'ME', 'NAI', 'OS'],
  ['HY', 'PNOS'],
  ['KRA', 'TOS'],
  ['MO', 'MUS'],
  ['MOR', 'PHE', 'US'],
  ['NE', 'RE', 'US'],
  ['NO', 'TUS'],
  ['O', 'CEA', 'NUS'],
  ['O', 'NEI', 'ROI'],
  ['PAE', 'AN'],
  ['PAL', 'LAS'],
  // ['PAN'],
  ['PHOS', 'PHOR', 'US'],
  ['PLU', 'TUS'],
  ['POL', 'LUX'],
  ['PON', 'TUS'],
  ['PO', 'SEI', 'DON'],
  ['PRIA', 'PUS'],
  ['PRI', 'CUS'],
  ['PRO', 'ME', 'THE', 'US'],
  ['TAR', 'TA', 'RUS'],
  ['TRI', 'TON'],
  ['TY', 'PHON'],
  ['UR', 'A', 'NUS'],
  ['ZE', 'LUS'],
  ['ZE', 'PHY', 'RUS'],
  ['ZE', 'US'],
  ['A', 'CHE', 'LOIS'],
  ['AL', 'CY', 'ONE'],
  ['A', 'LEC', 'TRO', 'NA'],
  ['AMPH', 'IT', 'RITE'],
  ['AN', 'THEI', 'A'],
  ['A', 'PA', 'TE'],
  ['A', 'PHA', 'EA'],
  ['A', 'PHRO', 'DITE'],
  ['AR', 'TE', 'MIS'],
  ['A', 'STRA', 'EA'],
  ['A', 'TE'],
  ['A', 'THE', 'NA'],
  ['A', 'TRO', 'POS'],
  ['BI', 'A'],
  ['BRI', 'ZO'],
  ['CAL', 'LIO', 'PE'],
  ['CA', 'LY', 'PSO'],
  ['CE', 'LAE', 'NO'],
  ['CE', 'TO'],
  ['CIR', 'CE'],
  ['CLI', 'O'],
  ['CLO', 'THO'],
  ['CY', 'BE', 'LE'],
  ['DE', 'ME', 'TER'],
  ['DO', 'RIS'],
  ['EI', 'LEI', 'THYA'],
  ['E', 'LEC', 'TRA'],
  ['EL', 'PIS'],
  ['E', 'NYO'],
  ['E', 'OS'],
  ['E', 'RA', 'TO'],
  ['E', 'RIS'],
  ['EU', 'TER', 'PE'],
  ['GA', 'IA'],
  ['HAR', 'MO', 'NIA'],
  ['HE', 'BE'],
  ['HE', 'CA', 'TE'],
  ['HE', 'ME', 'RA'],
  ['HE', 'RA'],
  ['HES', 'TIA'],
  ['HY', 'GEA'],
  ['I', 'RIS'],
  ['KE', 'RES'],
  ['KO', 'TYS'],
  ['LA', 'CHE', 'SIS'],
  ['MA', 'IA'],
  ['MA', 'NIA'],
  ['MEL', 'PO', 'MENE'],
  ['ME', 'RO', 'PE'],
  ['ME', 'TIS'],
  ['NE', 'ME', 'SIS'],
  ['NI', 'KE'],
  // ['NYX'],
  ['PEI', 'THO'],
  ['PHE', 'ME'],
  ['PO', 'LY', 'HY', 'MNIA'],
  ['RHE', 'A'],
  ['SE', 'LENE'],
  ['STE', 'ROPE'],
  // ['STYX'],
  ['TAY', 'GE', 'TE'],
  ['TER', 'PSI', 'CHO', 'RE'],
  ['E', 'RI', 'NYS'],
  ['CHA', 'RIS'],
  ['THE', 'MIS'],
  ['THE', 'TIS'],
  ['TY', 'CHE'],
  ['U', 'RA', 'NIA'],
]

interface Rule {
  id: string
  code: string
  validated: boolean
}

function generateGodName(): string {
  let nbSyllables = 0
  let name = ''
  while (true) {
    const possibleNameSyllables = godsSyllables.filter(
      (syllables) => syllables.length > nbSyllables
    )
    const pickedName =
      possibleNameSyllables[
        Math.floor(Math.random() * possibleNameSyllables.length)
      ]

    name += pickedName[nbSyllables]
    nbSyllables++

    if (pickedName.length === nbSyllables) {
      return name
    }
  }
}

export { Rule, generateGodName }
