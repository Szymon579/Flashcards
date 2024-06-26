using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CardsCollection;
using api.Dtos.Collection;
using api.Models;

namespace api.Mappers
{
    public static class CollectionMappers
    {
        public static CollectionDto ToCollectionDto(this Collection cardsCollection)
        {
            return new CollectionDto
            {
                Id = cardsCollection.Id,
                Title = cardsCollection.Title
            };
        }

        public static CollectionWithCardsDto ToCollectionWithCardsDto(this Collection cardsCollection)
        {
            return new CollectionWithCardsDto
            {
                Id = cardsCollection.Id,
                Title = cardsCollection.Title,
                Cards = cardsCollection.Cards.Select(x => x.ToCardDto()).ToList()
            };
        }
    
        public static Collection ToCollectionFromCreateDto(this CreateCollectionDto collectionDto, string userId) 
        {
             return new Collection
             {
                UserId = userId,
                Title = collectionDto.Title
             };   
        }

        public static Collection ToCollectionFromUpdateDto(this UpdateCollectionDto collectionDto) 
        {
             return new Collection
             {
                Id = collectionDto.Id,
                Title = collectionDto.Title
             };   
        }


    }

    
}