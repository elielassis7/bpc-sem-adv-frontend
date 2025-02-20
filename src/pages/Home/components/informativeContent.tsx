export function InformativeContent() {

  type ContentItem = {
    title: string;
    description: string;
    container: string;
  };

  const content: ContentItem[] = [
    {
      title: "Você sabia?",
      description: "Você sabia que <u>não precisa de um advogado</u> para dar entrada no benefício do BPC? Isso mesmo, você mesmo pode fazer todo o processo de forma totalmente online e economizar mais de <strong>R$5.000,00 em honorários advocatícios</strong>. Eu, pessoalmente, também fui uma das muitas vítimas da ideia de que para conseguir o BPC precisávamos de um advogado. Na verdade, é um processo totalmente administrativo, e não judicial. O advogado só é necessário em casos muito específicos, o que não é a realidade para a maioria das pessoas.",
      container: "<div class='bg-slate-500 w-full h-full'/>"
    },
    {
      title: "Mas Afinal o que é o BPC?",
      description: "O <strong>Benefício de Prestação Continuada (BPC)</strong> é um direito garantido para as pessoas elegíveis, no âmbito da Assistência Social. Quem tem direito a ele recebe <u>1 salário mínimo por mês</u> (atualmente no valor de <strong>R$ 1.518,00</strong>). O BPC não é aposentadoria, por isso para receber <strong>não precisa ter contribuído com INSS antes.</strong>",
      container: ""
    },
    {
      title: "Quem tem direito ao BPC?",
      description: "<u>Pessoas com deficiência de qualquer idade e pessoas com 65 anos ou mais</u> que não podem se manter sozinhas ou ser mantidas pela família. A família do idoso ou da pessoa com deficiência tem de ter baixa renda, ou seja, a renda de cada pessoa do grupo familiar tem de ser igual ou menor que <strong>R$ 379,50</strong> (ou 1/4 do salário mínimo, que é de R$ 1.518,00). Existe também a <u>possibilidade</u> da concessão do BPC para famílias com renda mensal 1/2 salário mínimo (R$759,00), porém são para casos mais específicos onde vai ser verificado: grau da deficiência, dependência de terceiros e comprometimento do orçamento familiar.",
      container: ""
    },
    {
      title: "Estrangeiro tem direito?",
      description: "Sim, Tem direito ao BPC o brasileiro, nato ou naturalizado, e as pessoas de nacionalidade portuguesa, desde que comprovem residência no Brasil. Precisa estar com a documentação em dia e ter CPF. Brasileiros que moram fora do Brasil ou pretendem sair não têm direito ao BPC.",
      container: ""
    },
    {
      title: "O que é considerado deficiência para o BPC?",
      description: "A deficiência é uma condição que causa dificuldades físicas, mentais, intelectuais ou sensoriais por um longo período (pelo menos 2 anos). Essas dificuldades, junto com várias barreiras, podem dificultar ou impedir que uma pessoa participe plenamente da sociedade em igualdade com os outros.",
      container: ""
    },
    {
      title: "Quem não tem direito?",
      description: "Quem não se enquadra no cálculo da renda familiar, que recebe outro benefício de Seguridade Social (como, por exemplo, o seguro desemprego, a aposentadoria e a pensão), CPF irregular e pessoas que não possam comprovar sua deficiência de longa permanência.",
      container: ""
    },
    {
      title: "Sobre o cálculo da renda",
      description: "<strong>Pessoas que entram no cálculo da renda</strong>: o Requerente (pessoa idosa ou pessoa com deficiência que pede o benefício); o cônjuge ou companheiro; os pais e, na ausência deles, a madrasta ou o padrasto; irmãos solteiros; filhos e enteados solteiros; e os menores tutelados. Você vai somar a renda bruta da família e dividir pela quantidade de pessoas da sua família e chegar ao valor da renda Per Capita, mais abaixo teremos uma calculadora para facilitar o cálculo.",
      container: "<div class='rounded-lg bg-emerald-600 p-2 text-white'><strong>Rendas que não devem entrar nesse cálculo</strong>: </br> &bull; Remuneração da pessoa com deficiência na condição de aprendiz ou estagiário </br> &bull; Recursos de programas de transferência de renda, como o Programa Bolsa Família (PBF) </br> &bull; Benefícios e auxílios assistenciais eventuais e temporários </br> &bull; BPC ou benefício previdenciário no valor de até 1 salário mínimo (apenas para concessão do BPC a outro idoso ou pessoa com deficiência da mesma família, ou seja, mais de 1 pessoa pode ter BPC na mesma família).</div>"
    },

  ]
  return (
    <>
      {content.map((item, index) => (
        <div key={index} className="flex flex-row odd:flex-row-reverse mx-20 mb-12">
          <div className="flex-1 text-center flex flex-col gap-2 justify-center">
            <h2 className="text-2xl text-center font-bold">
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



