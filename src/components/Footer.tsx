import BpcLogo from '../assets/bpc-logo.png'

export function Footer() {
  return (
    <footer className="bg-emerald-400 p-4 text-yellow-900 font-semibold bottom-0">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg mb-2">
            Contato
          </h2>
          <p>Email: contato@empresa.com</p>
          <p>Telefone: (99) 9999-9999</p>
        </div>
        <div className="flex justify-center">
          <img src={BpcLogo} alt="Logo" className="h-32" />
        </div>
        <div>
          <h2 className="text-lg mb-2">Informações da Empresa</h2>
          <p>Endereço: Rua Exemplo, 123</p>
          <p>Horário de Funcionamento: 8h - 18h</p>
        </div>
      </div>
    </footer>
  )
}