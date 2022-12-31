import Movimentos from '../../models/movimentos';

class registraMOV {
  async registra_movimento(
    assistente_name,
    assistente_id,
    conta_origin,
    conta_destino,
    movimento,
    quantia,
  ) {
    try {
      console.log('bbbbbbbbbbbbbbbbbbbb');
      await Movimentos.create({
        assistente_name,
        assistente_id,
        conta_origin,
        conta_destino,
        movimento,
        quantia,
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async tipoM(assistente, tipoMov, origin, destino, quantia) {
    switch (tipoMov.toLowerCase()) {
      case 'depositou':
        try {
          await this.registra_movimento(assistente.nome, assistente.email, origin, '', tipoMov, `+ ${quantia},00`);
        } catch (error) {
          console.log('\n\n', error);
        }
        break;
      case 'levantou':
        await this.registra_movimento(assistente.nome, assistente.email, origin, '', tipoMov, `- ${quantia},00`);
        break;
      case 'transferencia':
        await this.registra_movimento(
          assistente.nome,
          assistente.email,
          origin,
          destino,
          tipoMov,
          `- ${quantia},00`,
        );
        break;
      default:
        break;
    }
  }
}

export default registraMOV;
