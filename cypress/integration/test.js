describe('My First Test', () => {
  const newMemberName = Math.random().toString(36).substr(2,5)
  const targetMember = Math.random().toString(36).substr(2,5) + ',' +  Math.random().toString(36).substr(2,5)
  it('정상적으로 잘 추가가 되는지', () => {
    cy.visit('http://localhost:3000')
    let rowLen = 0
    cy.get('.table-row').its('length').then((len) => {
      rowLen = len
    })
    cy.get('.newMember input')
      .type(newMemberName)
      .should('have.value', newMemberName)
    cy.get('.targetMember input')
      .type(targetMember)
      .should('have.value', targetMember)
    cy.contains('밥 머거').click()
    cy.get('.table-row').its('length').then((len) => {
      expect(len).to.equal(rowLen + 1)
    })
  })
  it('신규 입사자를 입력하지 않은 경우', () => {
    cy.visit('http://localhost:3000')
    cy.get('.targetMember input')
      .type(targetMember)
      .should('have.value', targetMember)
    cy.contains('밥 머거').click()
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('신규 입사자를 입력해주세요')
    })
  })
  it('출근자 리스트를 입력하지 않은 경우', () => {
    cy.visit('http://localhost:3000')
    cy.get('.newMember input')
      .type(newMemberName)
      .should('have.value', newMemberName)
    cy.contains('밥 머거').click()
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('기존 팀원을 입력해주세요')
    })
  })
  it('출근자를 한명만 입력한 경우', () => {
    cy.visit('http://localhost:3000')
    cy.get('.newMember input')
      .type(newMemberName)
      .should('have.value', newMemberName)
    cy.get('.targetMember input')
      .type('강민철')
      .should('have.value', '강민철')
    cy.contains('밥 머거').click()
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('밥을 같이 먹지 않은 팀원이 2명 미만입니다.')
    })
  })
  it('경우의 수가 안나올 경우', () => {
    cy.visit('http://localhost:3000')
    cy.get('.newMember input')
      .type(newMemberName)
      .should('have.value', newMemberName)
    cy.get('.targetMember input')
      .type(targetMember)
      .should('have.value', targetMember)
    cy.contains('밥 머거').click()
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('밥을 같이 먹지 않은 팀원이 2명 미만입니다.')
    })
  })
})
