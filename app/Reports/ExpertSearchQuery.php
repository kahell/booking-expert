<?php

namespace App\Reports;

class ExpertSearchQuery extends Report
{
    protected function buildBaseQuery()
    {
        return $this->db->table('experts')
            ->select([
                'experts.id',
                'experts.username',
                'experts.fullname',
                'experts.rating',
                'experts.avatar',
                $this->db->raw('COUNT(reviews.id) as reviews_count')
            ])
            ->leftJoin('reviews', 'experts.id', '=', 'reviews.expert_id')
            ->leftJoin('packages', 'experts.id', '=', 'packages.expert_id')
            ->groupBy('experts.username')
            ->take(12);
    }

    public function filterSection($section)
    {
        return $section ? $this->onlySection($section) : $this;
    }

    public function onlySection($section)
    {
        $this->query->where('packages.section', $section);
        return $this;
    }

    public function filterType($type)
    {
        return $type ? $this->onlyType($type) : $this;
    }

    public function onlyType($type)
    {
        $this->query->where('packages.type', $type);
        return $this;
    }

    public function filterCategory($category)
    {
        return $category ? $this->onlyCategory($category) : $this;
    }

    public function onlyCategory($category)
    {
        $this->query->where('packages.category', $category);
        return $this;
    }

    public function filterSubCategory($category)
    {
        return $category ? $this->onlySubCategory($category) : $this;
    }

    public function onlySubCategory($category)
    {
        $this->query->where('packages.subcategory', $category);
        return $this;
    }
}
