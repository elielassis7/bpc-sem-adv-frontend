import BpcLogo from '../assets/bpc-logo.png'

export function Footer() {
  return (
    <footer className="bg-emerald-400 p-4 mt-10 text-yellow-900 font-semibold bottom-0">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 tabIndex={30} className="text-lg mb-2">
            Contato
          </h2>
          <p tabIndex={31} title='Email da empresa'>Email: contato@empresa.com</p>
          <p tabIndex={32}>Telefone: (99) 9999-9999</p>
        </div>
        <div className="flex justify-center">
          <img tabIndex={33} src={BpcLogo} alt="Logo de BPC sem advogado" className="h-32" />
        </div>
        <div>
          <h2 tabIndex={34} className="text-lg mb-2">Informações da Empresa</h2>
          <p tabIndex={35}>Endereço: Rua Exemplo, 123</p>
          <p tabIndex={36}>Horário de Funcionamento: 8h - 18h</p>
        </div>
      </div>
    </footer>
  )
}