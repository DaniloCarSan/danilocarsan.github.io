
---
title: P6 - Vicío em tipo primitivos
date: 2024-06-12
tags:
    - Design de código
    - DDD
    - Boas práticas
---

Olá, espero que esteja bem!

Quando estamos desenvolvendo, é natural representar valores ou conceitos com os tipos padrão da linguagem que utilizamos, como por exemplo Int, String ou Double. Entretanto, se você modela todo o seu sistema apenas com os tipos base da linguagem, provavelmente você tem um vício em tipos primitivos e está perdendo a oportunidade de deixar seu código mais expressivo.

Em sistemas simples, que não têm conceitos muito ricos de negócio, talvez faça sentido usar apenas tipos base. Mesmo assim, você provavelmente já usa tipos mais ricos, como por exemplo um valor do tipo Date ou Datetime.

Isso ocorre porque o objetivo de se criar e utilizar tipos mais ricos é a centralização de ações de validação, cálculo, transformação e centralização dos dados. Para deixar um pouco mais claro, vamos seguir o exemplo de um valor representado por um tipo Date e não uma String qualquer.

Utilizamos um valor do tipo Date porque uma data possui muitos conceitos e ações que podem ser realizadas em cima dela, como por exemplo:

- formatar
- extrair ano, mes, dia, dia da semanda, minutos, segundos
- adicionar tempo (minuto, hora dia....)
- remover tempo (minuto, hora dia....)


Outro exemplo de que você poderia estar usando um tipo mais rico é na representação de um número de CPF. Sabemos que ele não é apenas uma lista de caracteres aleatórios, há um cálculo para a sua geração e validação, assim como a sua representação que pode ser tanto como um inteiro ou formatado com pontos e traço.

Se utilizássemos apenas um tipo base como int ou string, perderíamos a oportunidade de centralizar tudo em apenas um objeto. Além disso, toda essa lógica provavelmente ficaria espalhada em todo o sistema, o que dificultaria a manutenção e teste.

**Um tipo mais rico**
````
readonly class CPF {

    private int $value;

    public function __construct(string $rawValue)
    {
        $this->value = static::parse($rawValue);
    }

    public static function isValid(int $value): bool
    {
    }

    public function format(): string
    {
    }

    public function sanitize(string $value):int
    {
    }

    public static function parse(string $rawValue): int
    {
        $value = static::sanitize($rawValue);
        if(! static::isValid($value)) {
            // exception
        }

        return $value;
    }
}
````

**Uso**
````
$cpf = new CPF(...);
$cpf->value;
$cpf->format();
````

Abaixo temos um exemplo simples de um tipo Enum que modela o status de um usuário.

````
enum UserActiveStatus: string
{
    use EnumHelper;

    case Yes = "Y";
    case No = "N";

    public function isActive(): bool
    {
        return $this->value == UserActiveStatus::Yes->value;
    }

    public static function getLabels(): array
    {
        return [
            static::Yes->value => 'Sim',
            static::No->value => 'Não'
        ];
    }

    public function getLabel(): string
    {
        return static::getLabels()[$this->value];
    }
}
````

Classe usuários
````
class User {
    private $activeStatus;
}
````

Uso
````
$user->activeStatus()->isActive()
$user->activeStatus()->getLabel()
````

Ao modelarmos um sistema, temos que ficar atentos a essas pequenas coisas. Às vezes pensamos muito no macro, criando classes maiores, e esquecemos do micro. Há várias literaturas que abordam sobre isso, como o DDD e o Código Limpo. São boas literaturas e recomendo a leitura. Há muita coisa que fazemos, mas não percebemos que poderia ser feita e vista de uma perspectiva diferente.

Bem, é isso por hoje. Agradeço pelo tempo e até a próxima.