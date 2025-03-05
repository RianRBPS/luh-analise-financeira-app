import { useState } from "react";

type DecisionNode = {
  question: string;
  yes?: string;
  no?: string;
};

const decisionTree: Record<string, DecisionNode> = {
  start: {
    question: "É para gasto fixo?",
    yes: "planejamento",
    no: "compromete_gasto_fixo",
  },
  planejamento: {
    question: "Estava no meu planejamento financeiro?",
    yes: "entao_gaste",
    no: "planejar_para_mes_que_vem",
  },
  planejar_para_mes_que_vem: {
    question: "Dá para planejar para o mês que vem com mais calma?",
    yes: "entao_gaste",
    no: "nao_vale_a_pena",
  },
  compromete_gasto_fixo: {
    question: "Pode comprometer algum gasto fixo desse mês?",
    yes: "nao_vale_a_pena",
    no: "impacta_saude_mental",
  },
  impacta_saude_mental: {
    question: "Vai impactar minha saúde mental de alguma forma?",
    yes: "entao_gaste",
    no: "foi_ideia_de_outro",
  },
  foi_ideia_de_outro: {
    question: "Foi ideia de outra pessoa?",
    yes: "gastou_recentemente_com_pessoa",
    no: "quer_gastar_no_fundo",
  },
  gastou_recentemente_com_pessoa: {
    question: "Eu gastei com essa pessoa recentemente?",
    yes: "nao_vale_a_pena",
    no: "entao_gaste",
  },
  quer_gastar_no_fundo: {
    question: "Lá no fundo, eu quero gastar com isso?",
    yes: "entao_gaste",
    no: "nao_vale_a_pena",
  },
  entao_gaste: {
    question: "Então gaste!",
  },
  nao_vale_a_pena: {
    question: "Então não vale a pena!",
  },
};

const Swiping: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<string>("start");

  const handleSwipe = (direction: "yes" | "no") => {
    const nextNode = decisionTree[currentNode]?.[direction]; // Ensures safe access
    if (nextNode) {
      setCurrentNode(nextNode);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold">{decisionTree[currentNode].question}</h2>
        {decisionTree[currentNode].yes && (
          <button
            onClick={() => handleSwipe("yes")}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Sim
          </button>
        )}
        {decisionTree[currentNode].no && (
          <button
            onClick={() => handleSwipe("no")}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg ml-4"
          >
            Não
          </button>
        )}
      </div>
    </div>
  );
};

export default Swiping;
