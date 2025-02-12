export function InformativeContent() {

  const content = [
    {
      title: "Você sabia?",
      description: "Você sabia que <u>não precisa de um advogado</u> para dar entrada no benefício do BPC? Isso mesmo, você mesmo pode fazer todo o processo de forma totalmente online e economizar mais de <strong>R$5.000,00 em honorários advocatícios</strong>.            Eu, pessoalmente, também fui uma das muitas vítimas da ideia de que para conseguir o            BPC precisávamos de um advogado. Na verdade, é um processo totalmente administrativo,            e não judicial. O advogado só é necessário em casos muito específicos, o que não é a  realidade para a maioria das pessoas.",
      container: "<div class='bg-slate-500 w-full h-full'/>"
    },
    {
      title: "Mas Afinal o que é o BPC?",
      description: "O <strong>Benefício de Prestação Continuada (BPC)</strong> é um direito garantido para as pessoas elegíveis, no âmbito da Assistência Social.              Quem tem direito a ele recebe <u>1 salário mínimo por mês</u> (atualmente no valor de <strong>R$ 1.518,00</strong>).</br>O BPC não é aposentadoria, por isso para receber <strong>não precisa ter contribuído com INSS antes.</strong>",
      container: ""
    },
    {
      title: "Sobre o calculo da renda",
      description: "<strong>Pessoas que entram no calculo da renda</strong>: o Requerente(pessoa idosa ou pessoa com deficiência que pede o benefício); o cônjuge ou companheiro; os pais e, na ausência deles, a madrasta ou o padrasto; irmãos solteiros; filhos e enteados solteiros; e os menores tutelados.</br>Você vai soma a renda bruta da familia e dividir pela quantidade de pessoas da sua familia e chegar ao valor da renda Per Capita, mais abaixo teremos uma calculadora para facilitar o calculo",
      container: "<strong>Rendas que não devem entrar nesse calculo</strong>: </br> &bull; Remuneração da pessoa com deficiência na condição de aprendiz ou estagiário </br> &bull; Recursos de programas de transferência de renda, como o Programa Bolsa Família (PBF) </br> &bull; Benefícios e auxílios assistenciais eventuais e temporários </br> &bull; BPC ou benefício previdenciário no valor de até 1 salário mínimo (apenas para concessão do BPC a outro idoso ou pessoa com deficiência da mesma família, ou seja mais de 1 pessoa pode ter BPC na mesma familia)."
    },
    {
      title: "Quem tem direito ao BPC?",
      description: "<u>Pessoas com deficiência de qualquer idade e pessoas com              65 anos ou mais</u> que não podem se manter sozinhas ou ser              mantidas pela família.              A família do idoso ou da pessoa com deficiência tem de ter              baixa renda, ou seja, a renda de cada pessoa do grupo familiar tem de ser igual ou menor que <strong>R$ 379,50</strong> (ou 1/4 do              salário mínimo, que é de R$ 1.518,00).",
      container: ""
    },
    {
      title: "O que é considerado deficiência para o BPC?",
      description: "É um impedimento de longa duração (por pelo menos 2 anos), que pode ser físico, mental, intelectual ou sensorial, que, diante de muitas barreiras, pode dificultar a vida da pessoa na sociedade. ",
      container: ""
    },
    {
      title: "Cuidado com o seu dinheiro",
      description: "Nos últimos anos, muitos escritórios de advocacia            têm se especializado em oferecer o serviço de obtenção do BPC. No meu caso, sou pai de            uma filha autista e é muito comum ver advogados se intitulando defensores da causa autista,            quando na verdade, a única coisa que fazem é dar entrada no BPC em troca de altos honorários.            Quando o benefício da minha filha foi aprovado, achei estranho não haver mais etapas.            Foi então que pesquisei a fundo e descobri que o processo é tão simples que eu mesmo poderia ter feito.",
      container: ""
    },
    {
      title: "Quando descobri a verdade",
      description: "Minha esposa ficou arrasada quando mostrei o que            realmente o advogado fez para justificar o pagamento de mais de R$5.000 em honorários.            Fomos nós que juntamos os documentos, fizemos a perícia e corremos atrás dos laudos.            Ele apenas pegou tudo isso e deu entrada no processo. Por isso, criei este curso para ajudar            o máximo de pessoas a não caírem em uma dívida que pode ser evitada. Só quem precisa do benefício            sabe o valor de cada centavo a mais no orçamento.",
      container: ""
    }
  ]

  return (
    <>
      {content.map((item, index) => (
        <div key={index} className="flex flex-row odd:flex-row-reverse mx-20  mb-12">

          <div className="flex-1 text-center flex flex-col gap-2 justify-center">
            <h2 className="text-xl text-center font-bold">
              {item.title}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>

          <div
            className="flex-1 h-full w-9/12 ml-12 items-center"
            dangerouslySetInnerHTML={{ __html: item.container }}
          />

        </div>
      ))}
    </>
  )
};
