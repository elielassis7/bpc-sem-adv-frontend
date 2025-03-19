import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface PlayerProps {
  videoUrl: string;
  userId: string; // Identificador do usuário
  stepId: string; // Identificador do passo
}

export function Player({ videoUrl, userId, stepId }: PlayerProps) {
  const [progress, setProgress] = useState(0); // Progresso em %
  const [hasSentCompletion, setHasSentCompletion] = useState(false); // Controle para envio único
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (duration > 0) {
        const percentage = (currentTime / duration) * 100;
        setProgress(Math.round(percentage)); // Atualiza o progresso
      }
    }
  };

  useEffect(() => {
    // Enviar progresso ao backend sempre que mudar
    const sendProgress = async () => {
      try {
        await axios.post("/update-progress", {
          userId,
          stepId,
          progress,
        });
        console.log("Progresso enviado:", progress, "%");
      } catch (error) {
        console.error("Erro ao atualizar progresso:", error);
      }
    };

    if (progress > 0 && progress < 100) {
      sendProgress();
    }

    // Marca como concluído se atingir 80% ou mais
    if (progress >= 80 && !hasSentCompletion) {
      const markAsCompleted = async () => {
        try {
          await axios.post("/updateProgress", {
            userId,
            stepId,
            progress: 100,
            completed: true,
          });
          console.log("Vídeo marcado como concluído!");
          setHasSentCompletion(true); // Evita múltiplos envios
        } catch (error) {
          console.error("Erro ao marcar como concluído:", error);
        }
      };

      markAsCompleted();
    }
  }, [progress, userId, stepId, hasSentCompletion]);

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        onTimeUpdate={handleTimeUpdate} // Rastreia o progresso
        className="w-full h-[400px] border-4 bg-black border-yellow-400 rounded-sm"
      />

      <p className="text-xl text-gray-800 font-medium mt-2">
        Progresso: {progress}% assistido
      </p>
    </div>
  );
}
