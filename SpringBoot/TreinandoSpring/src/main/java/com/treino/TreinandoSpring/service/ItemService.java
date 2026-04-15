package com.treino.TreinandoSpring.service;

import com.treino.TreinandoSpring.entity.Item;
import com.treino.TreinandoSpring.repository.ItemRepository;

import java.util.List;

public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item salvar(Item item){
        return itemRepository.save(item);

    }

    public List<Item> listarTodos(){

    }
}
