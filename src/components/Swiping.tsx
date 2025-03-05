import React, { useState } from "react";
import { useDrag } from "@use-gesture/react";

const decisionTree = {
  start: { question: "É para gasto fixo?", yes: "planejamento", no: "compromete_gasto_fixo" },
  planejamento: { question: "Estava no meu planejamento financeiro?", yes: "entao_gaste", no: "planejar_para_mes_que_vem" },
  compromete_gasto_fixo: { question: "Pode comprometer algum gasto fixo desse mês?", yes: "nao_vale_a_pena", no: "impacta_saude_mental" },
  impacta_saude_mental: { question: "Vai impactar minha saúde mental de alguma forma?", yes: "entao_gaste", no: "foi_ideia_de_outro" },
  foi_ideia_de_outro: { question: "Foi ideia de outra pessoa?", yes: "gastou_recentemente_com_pessoa", no: "quer_gastar_no_fundo" },
  gastou_recentemente_com_pessoa: { question: "Eu gastei com essa pessoa recentemente?", yes: "nao_vale_a_pena", no: "entao_gaste" },
  quer_gastar_no_fundo: { question: "Lá no fundo, eu quero gastar com isso?", yes: "entao_gaste", no: "nao_vale_a_pena" },
  planejar_para_mes_que_vem: { question: "Dá para planejar para o mês que vem com mais calma?", yes: "nao_vale_a_pena", no: "entao_gaste" },
  entao_gaste: { question: "Então gaste!", yes: null, no: null },
  nao_vale_a_pena: { question: "Então não vale a pena", yes: null, no: null }
};

const Swiping: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<keyof typeof decisionTree>("start");
  const [swipeDirection, setSwipeDirection] = useState("");

  // Handle swipe gestures
  const bind = useDrag(({ movement: [x], direction: [xDir], down }) => {
    if (!down) {
      if (x > 50) {
        handleSwipe("yes");
      } else if (x < -50) {
        handleSwipe("no");
      }
    }
  });

  // Handle swipe logic
  const handleSwipe = (direction: "yes" | "no") => {
    setSwipeDirection(direction);
    const nextNode = decisionTree[currentNode][direction];
    if (nextNode) {
      setCurrentNode(nextNode as keyof typeof decisionTree);
    }
  };

  return (
    <div {...bind()} style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
      <h2>{decisionTree[currentNode].question}</h2>
      {decisionTree[currentNode].yes && decisionTree[currentNode].no && (
        <p style={{ fontSize: "14px", color: "gray" }}>Swipe Right for "YES" | Swipe Left for "NO"</p>
      )}
    </div>
  );
};

export default Swiping;
